import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f5f5f5', 
    paddingHorizontal: 15, 
    paddingTop: 10 
  },

  // Navbar
  navbar: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingVertical: 10 
  },

  navbarLogo: { 
    width: 120, 
    height: 40, 
    resizeMode: 'contain' 
  },

  userIcon: { 
    width: 40, 
    height: 40, 
    borderRadius: 20 
  },

  // Input de busca
  input: { 
    backgroundColor: '#fff', 
    width: '100%', 
    paddingVertical: 12, 
    paddingHorizontal: 15, 
    borderRadius: 8, 
    borderWidth: 1, 
    borderColor: '#ddd', 
    marginBottom: 15, 
    fontSize: 16 
  },

  // Categorias
  categories: { 
    flexDirection: 'row', 
    marginBottom: 15 
  },

  categoryButton: { 
    backgroundColor: '#4e9c21', 
    paddingVertical: 8, 
    paddingHorizontal: 14, 
    borderRadius: 20, 
    marginRight: 10, 
    flexDirection: 'row', 
    alignItems: 'center' 
  },

  categoryImage: { 
    width: 20, 
    height: 20, 
    marginRight: 8 
  },

  categoryText: { 
    color: '#FFF', 
    fontWeight: 'bold', 
    fontSize: 14 
  },

  // Lista de Eventos
  evento: { 
    backgroundColor: '#fff', 
    marginBottom: 15, 
    borderRadius: 8, 
    flexDirection: 'row', 
    elevation: 3, 
    overflow: 'hidden', 
    alignItems: 'center', 
    height: 140, // Ajuste de altura do card
  },

  imagem: { 
    width: 120,  // A largura foi ajustada para uma proporção mais adequada
    height: '100%',  // Ajuste para a imagem ocupar toda a altura do card
    borderTopLeftRadius: 8, 
    borderBottomLeftRadius: 8,
    resizeMode: 'cover',  // O 'cover' vai garantir que a imagem ocupe todo o card sem distorcer
  },

  eventoInfo: { 
    padding: 8,  
    flex: 1, 
    justifyContent: 'center' 
  },

  eventoNome: { 
    fontSize: 14, 
    fontWeight: 'bold', 
    marginBottom: 5 
  },  // Ajuste no tamanho e espaçamento

  eventoLocal: { 
    fontSize: 12, 
    color: '#666' 
  },  // Ajuste no tamanho

  // Estilos para Estrelas
  rating: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginVertical: 5, 
  },

  star: { 
    fontSize: 20, 
    color: '#FF5733', 
    marginRight: 5 
  },

  // Comentários
  commentsContainer: { 
    marginVertical: 5, 
    flexShrink: 1, 
  },

  commentText: { 
    fontSize: 14, 
    color: '#555', 
    marginBottom: 5,  
  },

  commentInput: { 
    backgroundColor: '#fff', 
    padding: 8,  
    borderRadius: 8, 
    borderWidth: 1, 
    borderColor: '#ddd', 
    marginTop: 10, 
    fontSize: 14 
  },

  // Botão principal
  button: { 
    backgroundColor: '#FF5733', 
    width: '100%', 
    paddingVertical: 12, 
    borderRadius: 8, 
    alignItems: 'center', 
    marginTop: 20 
  },

  buttonText: { 
    color: '#FFF', 
    fontSize: 16, 
    fontWeight: 'bold' 
  },

  // Estilos do Login
  loginContainer: { 
    flex: 1, 
    backgroundColor: '#1E1E1E', 
    alignItems: 'center', 
    justifyContent: 'center', 
    padding: 20 
  },

  logo: { 
    width: 100, 
    height: 100, 
    borderRadius: 50, 
    marginBottom: 20 
  },

  title: { 
    fontSize: 26, 
    fontWeight: 'bold', 
    color: '#FFF', 
    marginBottom: 5 
  },

  subtitle: { 
    fontSize: 14, 
    color: '#AAA', 
    marginBottom: 30 
  },

  link: { 
    color: '#FF5733', 
    marginTop: 10 
  },

  // Estilos do Perfil do Usuário
  profileHeader: { 
    alignItems: 'center', 
    marginBottom: 20 
  },

  profileImage: { 
    width: 80, 
    height: 80, 
    borderRadius: 40, 
    marginBottom: 10 
  },

  profileName: { 
    fontSize: 20, 
    fontWeight: 'bold' 
  },

  // Botão pequeno para abrir o menu de opções da conta
  optionSmallButton: { 
    backgroundColor: '#FF5733', 
    padding: 8, 
    borderRadius: 20, 
    position: 'absolute', 
    right: 10, 
    top: 10 
  },

  optionSmallText: { 
    color: '#FFF', 
    fontSize: 18, 
    fontWeight: 'bold' 
  },

  // 📌 **NOVOS ESTILOS para as opções no perfil**
  profileOptions: { 
    marginTop: 20, 
    width: '100%' 
  },

  profileOption: { 
    backgroundColor: '#FFF', 
    paddingVertical: 15, 
    paddingHorizontal: 20, 
    borderRadius: 8, 
    marginBottom: 10, 
    elevation: 3, 
    flexDirection: 'row', 
    alignItems: 'center' 
  },

  profileOptionText: { 
    fontSize: 16, 
    color: '#333' 
  },

  // Modal de Opções
  modalContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: 'rgba(0,0,0,0.5)' 
  },

  modalContent: { 
    backgroundColor: '#FFF', 
    padding: 20, 
    borderRadius: 10, 
    width: '80%', 
    alignItems: 'center', 
    position: 'relative' 
  },

  modalTitle: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    marginBottom: 15 
  },

  // Botão para cada opção no modal
  modalOption: { 
    paddingVertical: 10, 
    width: '100%', 
    alignItems: 'center' 
  },

  modalOptionText: { 
    fontSize: 16, 
    color: '#333' 
  },

  // Botão de Fechar (X) no canto superior direito do modal
  modalCloseButton: { 
    position: 'absolute', 
    top: 10, 
    right: 10, 
    padding: 5, 
    borderRadius: 20 
  },

  modalCloseText: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#333' 
  },

  // Título de Seção
  sectionTitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#333', 
    marginBottom: 10 
  },

  // Estilo para mensagem vazia
  emptyMessage: { 
    fontSize: 16, 
    color: '#888', 
    textAlign: 'center', 
    marginTop: 20 
  },

  // Novo estilo para a imagem grande (imagem do evento)
  imagemGrande: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
    borderRadius: 8,
  },

  // Estilo para a descrição do evento
  eventoDescricao: { 
    fontSize: 16, 
    color: '#333', 
    marginTop: 10, 
    lineHeight: 24 
  }
});
