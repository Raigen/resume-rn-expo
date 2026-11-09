import { TabStack } from '@/components/tab-stack';
import { resume } from '@/data/resume';

export default function EpagesLayout() {
  return <TabStack title={resume.experience.epages.shortName} />;
}
