import React ,{useState}from 'react'
import axios from "axios";
import "./Main.css"

const Main = () => {

    const [prompt, setPrompt] = useState("")
    const [size, setSize] = useState("")

    function showSpinner() {
        document.querySelector('.spinner').classList.add('show');
      }
      
      function removeSpinner() {
        document.querySelector('.spinner').classList.remove('show');
      }

    const submit = function (event) {
        showSpinner()
        event.preventDefault();
        axios.post('http://localhost:5000/generateimage', {
            prompt,size
        })
            .then((res) => {
                
                if (!res.ok) {
                    removeSpinner();
                    throw new Error('That image could not be generated');
                  }
                alert(`Your Acount Login Succesfully`)
                console.log("success")
                let imageUrl=res.data.data

                // document.querySelector('#img').src =''
                document.querySelector('#image').src =imageUrl

                // const token = res.data.token;
                // localStorage.setItem("group2project-5", token)
                // navigate('/')
                removeSpinner();
            }).catch((err) => {
                alert(err.response.data.message + err.response.status + " Error")
            })
    }

  return (
    <div>
         <main>
      <section class="showcase">
        <form id="image-form">
          <h1>Describe An Image</h1>
          <div class="form-control">
            <input type="prompt" id="prompt" placeholder="Enter Text"  onChange={((e) => setPrompt(e.target.value))}/>
           

          </div>
          {/* <!-- size --> */}
          <div class="form-control">
            <select type='size' name="size" id="size" onChange={((e) => setSize(e.target.value))}>
              <option value="small">Small</option>
              <option value="medium" selected>Medium</option>
              <option value="large">Large</option>
            </select>
          </div>
          <button type="submit" class="btn" onClick={submit}>Generate</button>
        </form>
      </section>

      <section class="image">
        <div class="image-container">
          <h2 class="msg"></h2>
          <img src="" alt="" id="image" />
        </div>
      </section>
    </main>
    </div>
  )
}

export default Main