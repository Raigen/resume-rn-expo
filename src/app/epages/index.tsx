import { ExperienceScreen } from '@/components/experience-screen';
import { resume } from '@/data/resume';

export default function EpagesScreen() {
  return <ExperienceScreen experience={resume.experience.epages} />;
}
