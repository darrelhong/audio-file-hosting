import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/dist/toast'

import { useAuth } from 'src/auth'

type AppLayoutProps = {
  children?: React.ReactNode
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const { logOut } = useAuth()

  return (
    <>
      <Toaster />
      <div className="px-4 pb-4 pt-2">
        <div className="navbar rounded-box bg-neutral text-neutral-content">
          <div className="navbar-start">
            <Link
              to={routes.home()}
              className="btn-ghost btn text-xl normal-case"
            >
              Home
            </Link>
          </div>

          <div className="navbar-end flex gap-1 ">
            <Link
              to={routes.manageAccount()}
              className="btn-ghost btn-sm btn normal-case"
            >
              Manage
            </Link>
            <button className="btn-accent btn-xs btn" onClick={logOut}>
              Logout
            </button>
          </div>
        </div>
      </div>
      {children}
    </>
  )
}

export default AppLayout
