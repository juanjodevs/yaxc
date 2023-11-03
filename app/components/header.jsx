import AuthButtonServer from './auth-button-server'

export default function Header () {
  return (
    <header className='flex flex-row justify-between px-5 py-2 border-b border-gray-400 dark:border-white'>
      <span className='font-bold text-xl'>Home</span>
      <AuthButtonServer />
    </header>
  )
}
