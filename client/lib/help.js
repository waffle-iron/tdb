formatarRole = function(role, cor = false) {
  let spanClass = texto = '';
  switch (role) {
  case 'god':
    spanClass = 'badge-success';
    texto = 'God';
    break;
  case 'admin':
    spanClass = 'badge-danger';
    texto = 'Administrador';
    break;
  case 'user':
    spanClass = 'badge-primary';
    texto = 'User';
    break;
  default:
    spanClass = 'badge-primary';
    texto = 'Desconhecido';
  }

  return cor ? '<span class="badge ' + spanClass + '">' + texto + '</span>' : texto;
};
