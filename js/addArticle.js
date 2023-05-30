//Преобразование файла в base64
const fileInput = document.getElementById('image')
let myFiles = {}
let isFilesReady = true

fileInput.addEventListener('change', async (event) => {
  myFiles = {}
  isFilesReady = false

  const inputKey = fileInput.getAttribute('name')
  let files = event.target.files;

  const filePromises = Object.entries(files).map(item => {
    return new Promise((resolve) => {
      const [index, file] = item
      const reader = new FileReader();
      reader.readAsBinaryString(file);

      reader.onload = function(event) {
        
        myFiles[inputKey] = `data:${file.type};base64,${btoa(event.target.result)}`

        resolve()
      };
    })
  })
})

//Отправка формы в БД и обновление страницы
const formElement = document.getElementById('form')

const handleForm = async (event) => {
  event.preventDefault();

  const formData = new FormData(formElement)

	let data = {
    'title': formData.get('title'),
    'content': formData.get('details'),
    'likes': 0,
  }

	Object.entries(myFiles).map(item => {
	  const [key, file] = item
	  data[key] = file
  })

  fetch('https://learnhub-project-cb2ba-default-rtdb.europe-west1.firebasedatabase.app/article.json', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': "application/json; charset=UTF-8"
        },
        body: JSON.stringify(data)
    }).then(()=>{
        location.reload()
    })
} 

formElement.addEventListener('submit', handleForm)