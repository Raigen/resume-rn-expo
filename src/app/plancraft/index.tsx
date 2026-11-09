import { ExperienceScreen } from '@/components/experience-screen';
import { resume } from '@/data/resume';

export default function PlancraftScreen() {
  return <ExperienceScreen experience={resume.experience.plancraft} />;
}
