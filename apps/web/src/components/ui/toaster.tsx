import { Toaster as SonnerToaster } from 'sonner'

export function Toaster() {
    return (
        <SonnerToaster
            position="bottom-center"
            toastOptions={{
                classNames: {
                    toast: [
                        '!rounded-pill',
                        '!border-0',
                        '!bg-[#1B251D]',
                        '!px-4 !py-2',
                        '!text-[13px] !leading-5',
                        '!font-medium !text-[#F3F5F1]',
                        '!shadow-none',
                    ].join(' '),
                },
            }}
        />
    )
}
