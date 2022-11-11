import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

const Sidebar = ({isOpen, closeModal}: { isOpen: boolean, closeModal: VoidFunction}) => {
  let [isOpen, setIsOpen] = useState(true)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="fixed z-10 inset-0" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-80 fixed left-0 inset-y-0 bg-white p-10 z-20">
                    <ul>
                        <li>メニュー</li>
                        <li>メニュー</li>
                        <li>メニュー</li>
                        <li>メニュー</li>
                    </ul>
                </Dialog.Panel>
              </Transition.Child>
        </Dialog>
      </Transition>
    </>
  )
}

export default Sidebar;