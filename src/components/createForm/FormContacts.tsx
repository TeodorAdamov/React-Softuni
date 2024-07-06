import FormInput from "../common/FormInput"

type FormContactProps = {
    email: string
    displayName: string
}

const FormContacts = ({ email, displayName }: FormContactProps) => {
    return (
        <div className="flex flex-col gap-3 bg-slate-200 rounded-md p-4">
            <p className="pb-4">Контакти</p>
            <div>
                <p className="text-sm">Име на продавача</p>
                <FormInput name='displayName' type='text' disabled={true} value={displayName} placeholder="Име" className="max-w-[500px] bg-white text" />
            </div>
            <div>
                <p className="text-sm">Имейл</p>
                <FormInput name='email' type='text' disabled={true} value={email} className="max-w-[500px] bg-white"/>
            </div>
            <div>
                <p className="text-sm">Телефон за връзка</p>
                <FormInput name='phoneNumber' type='text' placeholder="Телефон за връзка" className="max-w-[500px] bg-white"/>
            </div>
        </div>
    )
}

export default FormContacts