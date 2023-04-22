import { Link, routes } from '@redwoodjs/router'

type AppLayoutProps = {
  children?: React.ReactNode
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <>
      <div className="px-4 pt-2">
        <div className="navbar rounded-box bg-neutral text-neutral-content">
          <div className="navbar-start">
            <Link
              to={routes.home()}
              className="btn-ghost btn text-xl normal-case"
            >
              Home
            </Link>
          </div>

          <div className="navbar-end flex gap-2">
            <Link>Manage</Link>
            <button className="btn-accent btn-xs btn">Logout</button>
          </div>
        </div>
      </div>
      {children}
    </>
  )
}

export default AppLayout
