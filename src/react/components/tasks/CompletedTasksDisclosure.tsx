import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { type Task } from '../../../model';
import { TaskList } from './TaskList';
import { CompletedTaskButtons } from './buttons';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface CompletedTasksDisclosureProps {
  tasks: Task[];
}

export function CompletedTasksDisclosure({tasks}: CompletedTasksDisclosureProps) {
  return (
    <Disclosure>
      {({ open }) => (
        <>
          <DisclosureButton className="disclosure-btn">Completed Tasks{open ? <ChevronUp/> : <ChevronDown/>}</DisclosureButton>
      <DisclosurePanel className="disclosure-panel">
       <TaskList
                     tasks={tasks}
                     renderActions={(task) => <CompletedTaskButtons task={task} />}
                   />
      </DisclosurePanel>
        </>
      )}
    </Disclosure>
  )
}