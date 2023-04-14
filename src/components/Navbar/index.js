import Image from "next/image"
import { signOut, useSession, signIn, getSession } from "next-auth/react"
import Link from "next/link"
import { useState } from "react"
import axios from "axios"

const navigation = [
  { name: "Dashboard", href: "/" },
  { name: "Modérateur", href: "/moderateur" },
  { name: "Portail", href: "/portail" },
  { name: "Générateur", href: "/generateur" }
]

export default function Navbar() {
  const { data: session } = useSession()
  const [isSignUp, setIsSignUp] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const toggleModal = () => {
    setIsSignUp(!isSignUp)
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const email = formData.get("email")
    const username = formData.get("username")
    const password = formData.get("password")
  
    if (isSignUp) {
      try {
        const response = await axios.post("http://localhost:3000/api/user/register", {
          email,
          username,
          password,
          role: "Membre",
        })
  
        // Si l'inscription est réussie, connectez l'utilisateur avec `signIn`
        if (response.status === 200 && response.data) {
          await signIn("credentials", {
            redirect: true,
            username,
            password,
          })
        } else {
          setErrorMessage("L'inscription a échoué. Veuillez réessayer.")
        }
      } catch (error) {
        console.log(error.response.data);
        // setErrorMessage("Une erreur s'est produite lors de l'inscription. Veuillez réessayer.")
      }
    } else {
      await signIn("credentials", {
        redirect: false,
        username,
        password,
      })
  
      await getSession()
    }
  }
  
  

  return (
    <div className="navbar bg-base-100 shadow-xl rounded-box">
      <div className="navbar-start">
        {session?.user && (
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
            <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                {navigation.map((item) => (
                  <a key={item.name} href={item.href}>
                    {item.name}
                  </a>
                ))}
              </li>
            </ul>
          </div>
        )}
        <Link className="btn btn-ghost normal-case text-xl" href="/" >Snowfus</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        {session?.user && (
          <ul className="menu menu-horizontal px-1">
            <li>
              {navigation.map((item) => (
                <a key={item.name} href={item.href}>
                  {item.name}
                </a>
              ))}
            </li>
          </ul>
        )}
      </div>
      <div className="navbar-end">
        {session?.user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar online">
              <div className="w-10 rounded-full">
                <Image src={session.user.image} alt={session.user.name} width={10} height={10} />
              </div>
            </label>
            <ul tabIndex={0} className="p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
              <div className="px-4 text-sm text-gray-900 dark:text-white">
                <div>{session.user.name}</div>
                <div className="font-medium truncate">{session.user.email}</div>
              </div>
              <div className="border-b border-gray-300 my-3"></div>
              <li><a onClick={() => signOut()}>Déconnexion</a></li>
            </ul>
          </div>
        ) : (
          <div className="flex-none">
            <label htmlFor="my-modal-4" className="btn btn-primary">
              Connectez-vous
            </label>
            <input type="checkbox" id="my-modal-4" className="modal-toggle" />
            <label htmlFor="my-modal-4" className="modal cursor-pointer">
              <div className="modal-box">
                <form onSubmit={handleFormSubmit}>
                  <div className="form-control">
                    <span className="text-center text-2xl text-primary font-bold">
                      {isSignUp ? 'Inscription' : 'Connexion'}
                    </span>
                    {errorMessage && (
                      <p className="text-sm text-red-500 mt-2">{errorMessage}</p>
                    )}
                    {isSignUp ? 
                      <>
                        <label className="label">
                          <span className="label-text font-medium">E-mail</span>
                        </label>
                        <input
                          type="text"
                          name="email"
                          placeholder="E-mail"
                          className="input input-bordered"
                        />
                      </>
                      : 
                      <></>
                    }
                    <label className="label">
                      <span className="label-text font-medium">Nom d&#39;utilisateur</span>
                    </label>
                    <input
                      type="text"
                      name="username"
                      placeholder="Utilisateur"
                      className="input input-bordered"
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">Mot de passe</span>
                    </label>
                    <input
                      type="password"
                      name="password"
                      placeholder="**************"
                      className="input input-bordered"
                    />
                    <label className="label">
                      {isSignUp ? 
                        <></>
                        : 
                        <a href="#" className="text-primary label-text-alt link link-hover font-medium">Mot de passe oublié?</a>
                      }
                    </label>
                  </div>
                  <div className="form-control mt-6 font-medium">
                    <button className="btn btn-primary w-full focus:ring-4 focus:outline-none rounded-lg text-sm px-5 py-2,5 text-center">
                      {isSignUp ? 'S\'inscrire' : 'Se connecter'}
                    </button>
                  </div>
                  <div className="text-sm pt-2">
                    {isSignUp ? 'Vous avez déjà un compte ?' : 'Vous n\'êtes pas inscrit ?'}
                    {' '}
                    <a href="#" className="text-primary hover:underline" onClick={toggleModal}>
                      {isSignUp ? 'Connectez-vous' : 'Créer un compte'}
                    </a>
                  </div>
                </form>
              </div>
            </label>
          </div>
        )}
      </div>
    </div>
  )
}
