
const sendHttpRequest = (method, url, data) => {
    
    const promise = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.open(method, url);

        xhr.responseType = 'json';

        if(data) {
            xhr.setRequestHeader('Content-Type', 'application/json');
        }

        xhr.onload = () => {
            if(xhr.status >= 400) {
                reject(xhr.response);
            } else {
                resolve(xhr.response);
            }
        };

        xhr.onerror = () => {
            reject ('Something went wrong!');
        };

        xhr.send(JSON.stringify(data));
    });
    return promise;
};

const getAllGraduates = () => {
    sendHttpRequest('GET', 'http://localhost:3000/api/graduates', true).then(responseData => {
        console.log(responseData);
        // document.getElementById('results').innerHTML = JSON.stringify(responseData);
        const parsed = responseData;
        const result = parsed.map(element => {
            return("<li>"+"First Name: " + element.firstName + ',' +'Last Name: ' + element.lastName + ',' + 'Email: ' + element.email + "</li>"); 
            
            // (`<li> ${element.firstName} </li>
            // <li>${element.lastName} </li>
            // <li> ${element.email} </li>`)
        })
        // document.getElementById('results').innerHTML = result;
        document.getElementById('results').innerHTML = "<ul>" + result.join("\n") + "</ul>"
    });
}

function createNewGraduate(e) {
    e.preventDefault();
    let graduate = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value
    }
  
    let xhr = new XMLHttpRequest();

    xhr.open('POST', 'http://localhost:3000/api/graduates');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(graduate));
}

document.getElementById('post-btn').addEventListener('click', createNewGraduate);
document.getElementById('get-btn').addEventListener('click', getAllGraduates);