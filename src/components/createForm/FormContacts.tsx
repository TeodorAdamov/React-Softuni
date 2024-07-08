import FormInput from "../common/FormInput"

const FormContacts = () => {
    return (
        <div className="flex flex-col gap-3 bg-slate-200 rounded-md p-4 shadow-inner">
            <p className="pb-4 text-2xl text-slate-800 text-center">Контакти</p>
            <div>
                <p className="text-sm">Име на продавача</p>
                <FormInput name='displayName' type='text' placeholder="Име" className="max-w-[500px] bg-white text" />
            </div>
            <div>
                <p className="text-sm">Имейл</p>
                <FormInput name='email' type='email' placeholder="Имейл" className="max-w-[500px] bg-white" />
            </div>
            <div>
                <p className="text-sm">Телефон за връзка</p>
                <FormInput name='phoneNumber' type='text' placeholder="Телефон за връзка" className="max-w-[500px] bg-white" />
            </div>
        </div>
    )
}

export default FormContacts