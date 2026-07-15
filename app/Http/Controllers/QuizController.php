<?php

namespace App\Http\Controllers;

use App\Models\Quiz;
use App\Models\QuizAttempt;
use App\Models\AttemptAnswer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class QuizController extends Controller
{
    public function index()
    {
        $quizzes = Quiz::withCount('questions')
            ->latest()
            ->paginate(10);

        return inertia('Quiz/index', [
            'quizzes' => $quizzes,
        ]);
    }

    public function create()
    {
        return inertia('Quiz/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'duration_minutes' => ['nullable', 'integer', 'min:1'],
            'pass_percentage' => ['required', 'integer', 'min:0', 'max:100'],
            'shuffle_questions' => ['boolean'],
            'is_published' => ['boolean'],

            'questions' => ['required', 'array', 'min:1'],
            'questions.*.question_text' => ['required', 'string'],
            'questions.*.type' => ['required', 'in:single,multiple'],
            'questions.*.points' => ['required', 'integer', 'min:1'],
            'questions.*.options' => ['required', 'array', 'min:2'],
            'questions.*.options.*.option_text' => ['required', 'string'],
            'questions.*.options.*.is_correct' => ['boolean'],
        ]);

        DB::transaction(function () use ($validated) {
            $quiz = Quiz::create([
                'title' => $validated['title'],
                'description' => $validated['description'] ?? null,
                'duration_minutes' => $validated['duration_minutes'] ?? null,
                'pass_percentage' => $validated['pass_percentage'],
                'shuffle_questions' => $validated['shuffle_questions'] ?? false,
                'is_published' => $validated['is_published'] ?? false,
                'created_by' => Auth::id(),
            ]);

            foreach ($validated['questions'] as $qIndex => $questionData) {
                // Guard: every question needs at least one correct option
                $hasCorrect = collect($questionData['options'])->contains('is_correct', true);
                abort_unless($hasCorrect, 422, "Question " . ($qIndex + 1) . " needs at least one correct option.");

                $question = $quiz->questions()->create([
                    'question_text' => $questionData['question_text'],
                    'type' => $questionData['type'],
                    'points' => $questionData['points'],
                    'order' => $qIndex,
                ]);

                foreach ($questionData['options'] as $oIndex => $optionData) {
                    $question->options()->create([
                        'option_text' => $optionData['option_text'],
                        'is_correct' => $optionData['is_correct'] ?? false,
                        'order' => $oIndex,
                    ]);
                }
            }
        });

        return redirect()
            ->route('quiz.index')
            ->with('success', 'Quiz created successfully');
    }

    public function edit(Quiz $quiz)
    {
        $quiz->load('questions.options');

        return inertia('Quiz/edit', [
            'quiz' => $quiz,
        ]);
    }

    public function update(Request $request, Quiz $quiz)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'duration_minutes' => ['nullable', 'integer', 'min:1'],
            'pass_percentage' => ['required', 'integer', 'min:0', 'max:100'],
            'shuffle_questions' => ['boolean'],
            'is_published' => ['boolean'],

            'questions' => ['required', 'array', 'min:1'],
            'questions.*.id' => ['nullable', 'integer', 'exists:questions,id'],
            'questions.*.question_text' => ['required', 'string'],
            'questions.*.type' => ['required', 'in:single,multiple'],
            'questions.*.points' => ['required', 'integer', 'min:1'],
            'questions.*.options' => ['required', 'array', 'min:2'],
            'questions.*.options.*.id' => ['nullable', 'integer', 'exists:options,id'],
            'questions.*.options.*.option_text' => ['required', 'string'],
            'questions.*.options.*.is_correct' => ['boolean'],
        ]);

        DB::transaction(function () use ($validated, $quiz) {
            $quiz->update([
                'title' => $validated['title'],
                'description' => $validated['description'] ?? null,
                'duration_minutes' => $validated['duration_minutes'] ?? null,
                'pass_percentage' => $validated['pass_percentage'],
                'shuffle_questions' => $validated['shuffle_questions'] ?? false,
                'is_published' => $validated['is_published'] ?? false,
            ]);

            // Simplest safe strategy: replace all questions/options wholesale.
            // (Cascades delete old options + attempt_answers referencing them —
            // acceptable pre-launch; switch to diff/sync once quizzes have live attempts.)
            $quiz->questions()->delete();

            foreach ($validated['questions'] as $qIndex => $questionData) {
                $hasCorrect = collect($questionData['options'])->contains('is_correct', true);
                abort_unless($hasCorrect, 422, "Question " . ($qIndex + 1) . " needs at least one correct option.");

                $question = $quiz->questions()->create([
                    'question_text' => $questionData['question_text'],
                    'type' => $questionData['type'],
                    'points' => $questionData['points'],
                    'order' => $qIndex,
                ]);

                foreach ($questionData['options'] as $oIndex => $optionData) {
                    $question->options()->create([
                        'option_text' => $optionData['option_text'],
                        'is_correct' => $optionData['is_correct'] ?? false,
                        'order' => $oIndex,
                    ]);
                }
            }
        });

        return redirect()
            ->route('quiz.index')
            ->with('success', 'Quiz updated successfully');
    }

    public function destroy(Quiz $quiz)
    {
        $quiz->delete();

        return redirect()
            ->route('quiz.index')
            ->with('message', 'Quiz deleted');
    }

    public function take(Quiz $quiz)
    {
        // One attempt per user per quiz, ever — the unique index on
        // (quiz_id, user_id) backs this up at the DB level too.
        $existing = QuizAttempt::where('quiz_id', $quiz->id)
            ->where('user_id', Auth::id())
            ->first();

        if ($existing && $existing->completed_at !== null) {
            return redirect()
                ->route('quiz.results.attempt', $existing->id)
                ->with('message', 'You have already completed this quiz.');
        }

        $quiz->load([
            'questions' => fn ($q) => $quiz->shuffle_questions
                ? $q->inRandomOrder()
                : $q->orderBy('order'),
            // Deliberately exclude is_correct — never ship the answer key to the client.
            'questions.options:id,question_id,option_text,order',
        ]);

        // Resume the existing in-progress attempt if one exists, otherwise start one.
        // Wrapped to handle the rare race where two requests land at once and both
        // pass the $existing check above — the DB's unique index is the real guard.
        try {
            $attempt = $existing ?? QuizAttempt::create([
                'quiz_id' => $quiz->id,
                'user_id' => Auth::id(),
                'started_at' => now(),
            ]);
        } catch (\Illuminate\Database\QueryException $e) {
            $attempt = QuizAttempt::where('quiz_id', $quiz->id)
                ->where('user_id', Auth::id())
                ->firstOrFail();
        }

        return inertia('Quiz/take', [
            'quiz' => $quiz,
            'attemptId' => $attempt->id,
        ]);
    }

    public function submit(Request $request, Quiz $quiz)
    {
        $validated = $request->validate([
            'attempt_id' => ['required', 'integer', 'exists:quiz_attempts,id'],
            'answers' => ['present', 'array'],
            'answers.*.question_id' => ['required', 'integer', 'exists:questions,id'],
            'answers.*.option_ids' => ['required', 'array', 'min:1'],
            'answers.*.option_ids.*' => ['integer', 'exists:options,id'],
        ]);

        $attempt = QuizAttempt::where('id', $validated['attempt_id'])
            ->where('quiz_id', $quiz->id)
            ->where('user_id', Auth::id())
            ->firstOrFail();

        abort_if($attempt->completed_at !== null, 422, 'This attempt has already been submitted.');

        $quiz->load('questions.options');

        DB::transaction(function () use ($validated, $attempt, $quiz) {
            $totalPoints = 0;
            $earnedPoints = 0;

            foreach ($quiz->questions as $question) {
                $totalPoints += $question->points;

                $submitted = collect($validated['answers'])
                    ->firstWhere('question_id', $question->id);

                $selectedOptionIds = $submitted['option_ids'] ?? [];
                $correctOptionIds = $question->options
                    ->where('is_correct', true)
                    ->pluck('id')
                    ->sort()
                    ->values();

                $selectedSorted = collect($selectedOptionIds)->sort()->values();
                $questionCorrect = $selectedSorted->all() === $correctOptionIds->all();

                foreach ($selectedOptionIds as $optionId) {
                    $option = $question->options->firstWhere('id', $optionId);

                    AttemptAnswer::create([
                        'quiz_attempt_id' => $attempt->id,
                        'question_id' => $question->id,
                        'option_id' => $optionId,
                        'is_correct' => $option?->is_correct ?? false,
                    ]);
                }

                if ($questionCorrect) {
                    $earnedPoints += $question->points;
                }
            }

            $scorePercentage = $totalPoints > 0
                ? round(($earnedPoints / $totalPoints) * 100, 2)
                : 0;

            $attempt->update([
                'completed_at' => now(),
                'score' => $earnedPoints,
                'score_percentage' => $scorePercentage,
                'passed' => $scorePercentage >= $quiz->pass_percentage,
            ]);
        });

        return redirect()
            ->route('quiz.results.attempt', $attempt->id)
            ->with('success', 'Quiz submitted successfully');
    }

    public function results(Quiz $quiz)
    {
        $attempts = $quiz->attempts()
            ->with('user:id,name')
            ->whereNotNull('completed_at')
            ->latest('completed_at')
            ->paginate(15);

        return inertia('Quiz/result', [
            'quiz' => $quiz,
            'attempts' => $attempts,
        ]);
    }

    public function attemptResult(QuizAttempt $attempt)
    {
        $isOwner = $attempt->user_id === Auth::id();
        $isStaff = Auth::user()->hasAnyRole(['admin', 'super-admin']);

        abort_unless($isOwner || $isStaff, 403);

        $attempt->load('quiz', 'answers.question.options', 'answers.option');

        return inertia('Quiz/attemptResult', [
            'attempt' => $attempt,
        ]);
    }
}