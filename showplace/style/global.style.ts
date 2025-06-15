import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ADD8E6',
    paddingHorizontal: 15,
    paddingTop: 10,
  },

  errorText: {
    color: '#FF3333',
    marginBottom: 10,
    textAlign: 'center',
  },

  // Adiciona aqui, no final do objeto, só isso
  eventCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    marginVertical: 8,
    padding: 12,
  },

  // Navbar
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    marginTop: 5,
    marginBottom: -15,
  },

  navbarLogo: {
    width: 50,
    height: 80,
    resizeMode: 'contain',
  },

  userIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  // Barra de Pesquisa
  input: {
    backgroundColor: '#fff',
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop: 0,
    marginBottom: 15,
    fontSize: 16,
  },

  notificationIcon: {
    width: 30,
    height: 30,
    tintColor: '#333', // ou qualquer cor que você deseje
  },

  // Categorias (Botões de Tipo de Evento)
  categories: {
    flexDirection: 'row',

    marginBottom: 10,
    flexWrap: 'wrap',  // Permite que os botões se ajustem em múltiplas linhas se necessário
  },

  categoryButton: {
    backgroundColor: '#6699A1',
    paddingVertical: 20,
    paddingHorizontal: 14,
    borderRadius: 10,
    marginRight: 10,
    marginBottom: 10, // Para separar os botões nas linhas seguintes
    flexDirection: 'row',
    alignItems: 'center',
  },

  categoryImage: {
    width: 20,
    height: 20,
    marginRight: 8,
  },

  categoryText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },

  // Lista de Eventos
  evento: {
    backgroundColor: '#FFFAFA',
    marginBottom: 15,
    borderRadius: 8,
    flexDirection: 'row',
    elevation: 3,
    overflow: 'hidden',
    alignItems: 'center',
    position: 'relative',  // Necessário para o ícone de favorito
    height: 160,  // Altura aumentada para acomodar os elementos dentro do card
  },

  imagem: {
    width: 120,
    height: '100%',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    resizeMode: 'cover',
  },

  eventoInfo: {
    flex: 1,
    justifyContent: 'center',  // Centraliza verticalmente
    padding: 10,
  },

  eventoNome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },

  eventoLocal: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },

  // Ícone de Favorito (Coração)
  favoritoIcon: {
    fontSize: 24,
    color: '#000000',
    position: 'absolute',  // Posicionamento absoluto para sobrepor o conteúdo
    top: 10,  // Ajuste do topo
    right: 10,  // Ajuste à direita
  },

  favoritoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5, // ou outro valor que achar adequado
    paddingLeft: 10,
  },

  // Estilos para Estrelas (rating)
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,  // Separação entre nome e avaliação
  },
  verComentariosBtn: {
    color: '#1E90FF',
    fontWeight: 'bold',
    textAlign: 'left',
  },

  star: {
    fontSize: 18,
    color: '#FF5733',
    marginRight: 5,
  },

  // Comentários
  commentsContainer: {
    marginVertical: 5,
    flexShrink: 1,
    backgroundColor: '#ADD8E6',
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
    fontSize: 14,
  },

  // Botão Sair
  button: {
    backgroundColor: '#6699A1',
    width: '100%',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 0,
  },

  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // Estilos do Login
  loginContainer: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 5,
  },

  subtitle: {
    fontSize: 14,
    color: '#AAA',
    marginBottom: 30,
  },

  link: {
    color: '#FFFFFF',
    marginTop: 10,
  },

  // Estilos do Perfil do Utilizador
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },

  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 15,
    marginTop: 60,
  },

  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  optionSmallButton: {
    backgroundColor: '#4A708B',
    padding: 8,
    borderRadius: 20,
    position: 'absolute',
    right: 10,
    top: 30,
  },

  optionSmallText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },

  profileOptions: {
    marginTop: 20,
    width: '100%',
  },

  profileOption: {
    backgroundColor: '#FFF',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },

  profileOptionText: {
    fontSize: 16,
    color: '#333',
  },

  // Modal de Definições
  sidePanel: {
    width: 300,
    backgroundColor: '#f0f0f0',
    padding: 50,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: -25,
  },

  modalContent: {
    backgroundColor: '#FFF',
    padding: 20,
    width: '100%',
    alignItems: 'center',
    position: 'relative',
  },

  modalTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 88,
    textAlign: 'center',
    marginBottom: 55,
    right: -15,
  },

  modalOption: {
    paddingVertical: 20,
    width: '100%',
    alignItems: 'center',
    right: -25,
  },

  modalOptionText: {
    fontSize: 16,
    color: '#333',
  },

  modalCloseButton: {
    position: 'absolute',
    top: 50,
    right: 10,
    padding: 5,
    borderRadius: 20,
  },

  modalCloseText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10, 
    textAlign: 'left',
  },

  emptyMessage: {
    fontSize: 15,
    color: '#000000',
    textAlign: 'center',
    marginTop: 310,
  },

  imagemGrande: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
    borderRadius: 10,
    marginTop: 40,
    marginBottom: 20,
  },

  eventoDescricao: {
    fontSize: 16,
    color: '#444',
    marginTop: 10,
    marginBottom: 30,
    lineHeight: 24,
  },

  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    elevation: 3,
    marginBottom: 20,
  },

  loadingText: {
    fontSize: 16,
    color: '#777',
    marginTop: 10,
    textAlign: 'left',
  },

  errorText1: {
    fontSize: 16,
    color: '#D00',
    textAlign: 'center',
    marginTop: 10,
  },

  // MinhasAvaliações
  containerAv: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ADD8E6', // Fundo azul clarinho da página
  },

  sectionTitleAv: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#003366', // azul escuro para título
  },

  eventoInfoAv: {
    backgroundColor: '#fff', // fundo branco para cada retângulo
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },

  eventoNomeAv: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
    marginBottom: 6,
  },

  eventoLocalAv: {
    fontSize: 16,
    color: '#004080',
  },

  // Estilos do FavoritosCalendario
favoritosCalendarioContainer: {
  flex: 1,
  padding: 10,
  backgroundColor: '#fff',
},

noFavoritesText: {
  textAlign: 'center',
  color: '#666',
  marginTop: 20,
},

backButton: {
  backgroundColor: '#6699A1',
  paddingVertical: 12,
  borderRadius: 8,
  marginTop: 30,
  alignItems: 'center',
},

backButtonText: {
  color: '#fff',
  fontWeight: 'bold',
  fontSize: 16,
},
// Estilos do RegisterScreen
registerContainer: {
  flex: 1,
  backgroundColor: "#fff",
},

registerScrollContainer: {
  padding: 20,
},

registerTitle: {
  fontSize: 24,
  fontWeight: "bold",
  marginBottom: 30,
  textAlign: "center",
},

registerLabel: {
  fontWeight: "600",
  marginBottom: 5,
  marginTop: 15,
},

registerInput: {
  borderWidth: 1,
  borderColor: "#ccc",
  borderRadius: 6,
  padding: 10,
  fontSize: 16,
},

registerLoginLinkContainer: {
  marginTop: 20,
  flexDirection: "row",
  justifyContent: "center",
},

registerLoginLink: {
  marginLeft: 5,
  color: "#007AFF",
  fontWeight: "600",
},

});
