const repoOwner = 'Wataru532';
const repoName = 'SchedulerStorage';
const branch = 'main';
var sha_value;

fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/commits/${branch}`)
.then(response => response.json())
.then(data => {
    sha_value= data.sha;
    //console.log('Latest commit SHA:', sha_value);
})
.catch(error => {
    console.error('Error:', error);
});

var token;
var times;
const Token = null;
//GitHubトークン解凍用コードは公開できないため削除済み。
//awaitは元のコードでは必須

export default await Token;

export const UploadJson = (week1,week2,x) => {
    const repo = 'SchedulerStorage'; //your-repo-name
    const owner = 'Wataru532'; //your-github-username
    const branch = 'main';
    const inputfile = x === 1 ? week1[0] : week2[0];
    const filedate = x === 1 ? week1[1] : week2[1];
    const file = new Blob([inputfile], { type: 'application/json'});
    const filePath = `scheduler_data${filedate}.json`;

    const reader = new FileReader();
    reader.onload = async function(event) {
        const content = btoa(event.target.result);
        const url = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;
        let filesha = null;
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `token ${token}`,
                    'Accept': 'application/vnd.github.v3+json'
                }
            });
            if (response.ok) {
                const data = await response.json();
                filesha = data.sha;
            }
        } catch (error) {
            console.error('Error checking file existence:', error);
        }

        const method = filesha ? 'PUT' : 'POST';
        const message = filesha ? `Update ${filePath}` : `Create ${filePath}`;

        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Authorization': `token ${token}`,
                    'Accept': 'application/vnd.github.v3+json',
                    'Content-Type': 'application/json'
                },
                body: 
                    JSON.stringify({
                    message: message,
                    content: content,
                    branch: branch,
                    sha: filesha
                })
            });

            if (response.ok) {  //後でここのコード直したい
                const data = await response.json();
                alert('ファイルのアップロードが完了しました。ページを閉じても構いません。');
            } else {
                const error = await response.json();
                alert(`Error: ${error.message}`);
            } 

            //if the next week's data exists
            if(week2 && x === 1) {
                UploadJson(week1,week2,2);
            }
        }catch (error) {
            console.error('Error uploading file:', error);
        }
    };
    reader.readAsBinaryString(file); 

}