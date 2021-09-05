// Mostrar alerta

function showAlert(type, text) {
    var alertPlaceholder = document.getElementById("alertPlaceholder")
    var wrapper = document.createElement('div')
    wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + text + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
  
    alertPlaceholder.append(wrapper)
    setInterval(function(){
        alertPlaceholder.removeChild(wrapper)
    }, 3000)
}

// Alerta dados dos alunos

function alertaAluno(alunoId) {
    console.log(alunoId)
    let alunoFiltrados = alunos.filter(aluno => aluno.id == alunoId)
    let aluno = alunoFiltrados[0]
    document.querySelector("#dadosAluno").innerHTML = `<b>Nome completo:</b> <br>${aluno.first_name} ${aluno.last_name}<br><b>Email:</b> <br>${aluno.email}<br><b>Telefone:</b> <br>${aluno.phone}`
}
