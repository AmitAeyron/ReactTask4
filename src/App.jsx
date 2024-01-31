import { useState, useCallback, useEffect, useRef } from 'react'



function App() {
  const [length, setLength] = useState(4);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef=useRef(null)



  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

    if (numberAllowed) {
      str += "012345689";
    }
    if (charAllowed) {
      str += "!@#$^&*-_+=[]{}~`"
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);

    }

    setPassword(pass);

  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard=useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,999);
    window.navigator.clipboard.writeText(password);
  },[password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])


  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-xl px-4 my-20 text-white bg-gray-600' >
        <h1 className='text-white text-xl text-center my-3' >Password Generator</h1>
        <div className='classNmae="flex shadow rounded-md overflow-hidden mb-4 text-orange-600 ' >

          <input
            type="text"
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='Password'
            readOnly
            ref={passwordRef}
          />
          <button onClick={copyPasswordToClipboard}  className='outline-none bg-blue-800 text-white px-3 py-0.5 shrink-0' >copy</button>
        </div>
        <div className='flex text-sm gap-x-2' >

          <div className='flex items-center gap-x-1'>

            <input

              type="range"
              min={1}
              max={50}
              value={length}
              className='cursor-pointer'
              onChange={(e) => { setLength(e.target.value) }}

            />
            <label>Length:{length}</label>

          </div>

          <div className='flex items-center gap-x-1'>

            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}

            />
            <label htmlFor="numberInput">Numbers</label>
          </div>

          <div className='flex items-center gap-x-1'>

            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}

            />
            <label htmlFor="characterInput">Character</label>
          </div>

        </div>
      </div>
    </>
  )
}

export default App
