import { useState } from "react";
//JSONの受け取り前提で書いてる

export const Data = ()=>{
    const [contents,setContents] =useState("")
    console.log(contents)
    const handleFileChange = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
          console.error('ファイルを選択して下さい')
          return
        }
      
        const file = e.target.files[0]
      
        const reader = new FileReader()
        reader.onload = event => {
          const content = event.target?.result
            try {
              const jsonData = JSON.parse(content)
              console.log(jsonData)
              setContents(jsonData)
            } catch (error) {
              console.error('JSONファイルを解析できませんでした。', error)
            }
          }
          reader.readAsText(file)
        }

      
      return (
      <div>
        <input type='file' accept='.json' onChange={handleFileChange} />
      </div>
    )
      
}