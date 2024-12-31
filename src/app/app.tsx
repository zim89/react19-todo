fetch('http://localhost:4000/users').then(response => {
  console.log(response)
})

export function App() {
  return <h1 className='text-3xl font-bold underline'>Hello world!</h1>
}
