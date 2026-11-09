import { TabStack } from '@/components/tab-stack';
import { resume } from '@/data/resume';

export default function PlancraftLayout() {
  return <TabStack title={resume.experience.plancraft.shortName} />;
}
