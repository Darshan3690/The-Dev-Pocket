import SkillAssessmentQuiz from '@/components/learning-path/SkillAssessmentQuiz';

export default function StartYourPathPage() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-2 text-center">Start Your Path</h1>
      <p className="text-muted-foreground text-center mb-10">
        Answer 12 quick questions and we&apos;ll build a personalized learning roadmap for you.
      </p>
      <SkillAssessmentQuiz />
    </main>
  );
}
