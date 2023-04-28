import { RxHamburgerMenu, RxPerson, RxHome } from 'react-icons/rx'
import { Link } from 'react-router-dom'

type Props = {
  burgerOpen: boolean
  setBurgerOpen: (e: boolean) => void
}

export const Header = ({ burgerOpen, setBurgerOpen }: Props) => {
  return (
    <header className=''>
      <div className='bg-azulc h-16 flex items-center justify-between p-2 flex-col shadow-sm'>
        <nav className='w-full flex justify-between items-center text-bg'>
          <span className='text-lg font-bold p-2'>ImobWil</span>
          <div>
            <RxHamburgerMenu
              size={30}
              onClick={() => setBurgerOpen(!burgerOpen)}
            />
            {burgerOpen ? (
              <div className='z-10 md:right-1/4 md:mr-2.5 absolute top-5 right-2 p-4 bg-azulc shadow-lg border-[1px] border-cinza rounded-b-lg rounded-tl-lg select-none'>
                <div className='flex flex-col'>
                  <Link to='/cadastroInquilino'>
                    <button className='flex px-2  hover:opacity-70'>
                      <RxPerson size={20} />
                      <span className='ml-2'> Cadastrar Inquilinos</span>
                    </button>
                  </Link>
                  <hr className='my-3 opacity-50' />
                  <Link to='/cadastroImovel'>
                    <button className='flex px-2 hover:opacity-70'>
                      <RxHome size={20} />
                      <span className='ml-2'>Cadastrar Imóveis</span>
                    </button>
                  </Link>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}
