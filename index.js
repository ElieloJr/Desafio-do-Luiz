
var alunos = []

var editedAlunoId = 0

var alunoFields = {
    name: document.getElementById("nameNewAluno"),
    phone: document.getElementById("telefoneNewAluno"),
    lastName: document.getElementById("lastNameNewAluno"),
    email: document.getElementById("emailNewAluno")
}

let endpointURL = "http://172.16.48.54:5000/api/alunos"


function createNewAluno(data) {
    self.alunos.push(data)
    showAlert("success", `Aluno adicionado com sucesso`)
}

function updateAluno(data) {
    apagaAluno(data.id)
    self.alunos.push(data)
    showAlert("success", `Aluno alterado com sucesso`)
    updateAlunosList()
}

function updateAlunosList() {
    let list = document.getElementById("items")
    var alunoEntries = ""
    self.alunos.forEach(aluno => {
        alunoEntries += `<tr><td>${aluno.first_name}</td><td>${aluno.last_name}</td><td>${aluno.email}</td><td>${aluno.phone}</td><td><button class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick="editAluno(${aluno.id})">Editar</button></td><td><button onClick="apagaAluno(${aluno.id})" class="btn btn-danger">Apagar</button></td><td><button onClick="alertaAluno(${aluno.id})" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Ver Dados</button></td></tr>`
    });

    list.innerHTML = alunoEntries
}

function apagaAluno(idAluno) {
    var newAlunos = self.alunos.filter(aluno => aluno.id != idAluno)
    self.alunos = newAlunos
    updateAlunosList()
}

function editAluno(idAluno) {
    self.editedAlunoId = idAluno
    let aluno = alunos.filter(aluno => aluno.id == idAluno)[0]
    setCampos(aluno)
}

function setCampos(aluno) {
    console.log(aluno)
    alunoFields.name.value = aluno.first_name
    alunoFields.phone.value = aluno.phone
    alunoFields.lastName.value = aluno.last_name
    alunoFields.email.value = aluno.email
}

function getCampos() {
    return {first_name: alunoFields.name.value, phone: alunoFields.phone.value, last_name: alunoFields.lastName.value, email: alunoFields.email.value}
}

function clearCampos() {
    alunoFields.name.value = ""
    alunoFields.phone.value = ""
    alunoFields.lastName.value = ""
    alunoFields.email.value = ""
}

function addAluno() {
    let infoNewAluno = getCampos()
    infoNewAluno.id = getRandomInt(1,100000)
    clearCampos()
    createNewAluno(infoNewAluno)
    updateAlunosList()
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

function submitAlunoEdit() {
    var editedAluno = getCampos()
    editedAluno.id = self.editedAlunoId
    updateAluno(editedAluno)
    clearCampos()

}

function exemplo(cond, callback) {
    if(cond){ 
        callback()
    }
}

function clickLimpar() {
    console.log('limpa')
    clearCampos()
    let limparBtn = document.getElementById("limpar")
    limparBtn.hidden = true
    exemplo(false, function() {
        console.log("teste")
    })
}



document.addEventListener("DOMContentLoaded", function() {
    updateAlunosList(self.alunos)
    let createButton = document.getElementById("criarAlunoBtn")
    createButton.addEventListener('click', () => {
        addAluno()
    })

    let editButton = document.getElementById("editarAlunoBtn")
    let limparBtn = document.getElementById("limpar")
    limparBtn.hidden = true
    limparBtn.addEventListener('click', clickLimpar)
    editButton.addEventListener('click', () => {
        if(self.editedAlunoId == 0) {
            showAlert('warning', "Favor selecionar um aluno")
        } else {
            submitAlunoEdit()
        }
    })
});