import React from "react";
import { Controller } from "react-hook-form";
import { Link } from "react-router-dom";
import { useRegisterForm } from "../hooks/useRegisterForm";

export const RegisterForm: React.FC = () => {
    const hook = useRegisterForm()

    return <>
        {
            hook.isSaved && <span className="absolute bottom-2 right-2 px-2 py-1 font-semibold text-white bg-green-500 rounded-lg">Votre compte a bien été enregistrée !</span>
        }

        <h1 className="px-2 py-1 font-bold text-xl bg-gray-300 rounded-lg">Page d'inscription</h1>

        <form className="flex flex-col gap-1 w-1/3 px-4 py-2 bg-gray-300 rounded-lg" onSubmit={hook.handleSubmit(hook.submit)}>
            <div className="flex justify-center items-center gap-2">
                <label className="w-1/3 text-center font-semibold" htmlFor="username">Nom d'utilisateur</label>

                <Controller
                    control={hook.control}
                    rules={{ required: true }}
                    name="username"
                    defaultValue={""}
                    render={({field}: any) => <input
                        id="username"
                        type="text"
                        className="w-2/3 px-2 py-1 bg-white font-semibold rounded-sm border-1 border-gray-400"
                        placeholder="Saisissez un nom"
                        {...field}
                    />}
                />
            </div>
            {
                hook.errors.username && <p className="text-center text-red-600 font-semibold">{String(hook.errors.username.message)}</p>
            }

            <div className="flex justify-center items-center gap-2">
                <label className="w-1/3 text-center font-semibold" htmlFor="email">Email</label>

                <Controller
                    control={hook.control}
                    rules={{ required: true }}
                    name="email"
                    defaultValue={""}
                    render={({field}: any) => <input
                        id="email"
                        type="email"
                        className="w-2/3 px-2 py-1 bg-white font-semibold rounded-sm border-1 border-gray-400"
                        placeholder="Saisissez un email"
                        {...field}
                    />}
                />
            </div>
            {
                hook.errors.email && <p className="text-center text-red-600 font-semibold">{String(hook.errors.email.message)}</p>
            }

            <div className="flex justify-center items-center gap-2">
                <label className="w-1/3 text-center font-semibold" htmlFor="password">Mot de passe</label>

                <Controller
                    control={hook.control}
                    rules={{ required: true, minLength: 6 }}
                    name="password"
                    defaultValue={""}
                    render={({field}: any) => <input
                        id="password"
                        type="password"
                        className="w-2/3 px-2 py-1 bg-white font-semibold rounded-sm border-1 border-gray-400"
                        placeholder="Saisissez un mot de passe"
                        {...field}
                    />}
                />
            </div>
            {
                hook.errors.password && <p className="text-center text-red-600 font-semibold">{String(hook.errors.password.message)}</p>
            }

            <div className="flex justify-end mt-1">
                <Link className="w-fit text-sm text-blue-800 hover:text-blue-600" to={"/login"}>Déjà un compte ?</Link>
            </div>

            {
                hook.networkError && <p className="text-center text-red-600 font-semibold">{hook.networkError}</p>
            }

            <button disabled={!hook.isSubmittable} className="w-fit mx-auto mt-1 px-2 py-1 rounded-lg bg-green-400 font-semibold cursor-pointer hover:bg-green-300 disabled:bg-zinc-400 disabled:text-zinc-200">S'inscrire</button>
        </form>
    </>
}