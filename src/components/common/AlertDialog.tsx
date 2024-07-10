import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/ui/alert-dialog"
import { Button } from "@/ui/button"

type ConfirmDialogProps = {
    id: string
    handleDelete: (id: string) => void
}

const ConfirmDialog = ({ handleDelete, id }: ConfirmDialogProps) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <button className="bg-slate-800 text-slate-200 p-2 rounded-md font-bold text-xl text-center">Изтриване</button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Потвърдете изтриването</AlertDialogTitle>
                    <AlertDialogDescription>
                        Това ще изтрие обявата завинаги от нашите сървъри!
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Откажи</AlertDialogCancel>
                    <AlertDialogAction onClick={(_) => handleDelete(id)}>Потвърди</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}


export default ConfirmDialog