import { useState, useEffect } from 'react'
import { 
  Container, 
  Typography, 
  Button, 
  Box, 
  Paper, 
  AppBar, 
  Toolbar, 
  Divider,
  Card,
  CardContent,
  Grid
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import UserTable from './components/UserTable'
import UserFormModal from './components/UserFormModal'

function App() {
  const [users, setUsers] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)

  // Load users from localStorage on component mount
  useEffect(() => {
    const storedUsers = localStorage.getItem('users')
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers))
    }
  }, [])

  // Save users to localStorage whenever the users state changes
  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users))
  }, [users])

  const handleOpenModal = () => {
    setCurrentUser(null)
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
    setCurrentUser(null)
  }

  const handleEdit = (user) => {
    setCurrentUser(user)
    setOpenModal(true)
  }

  const handleDelete = (userId) => {
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
      setUsers(users.filter(user => user.id !== userId))
    }
  }

  const handleSave = (userData) => {
    if (currentUser) {
      // Edit existing user
      setUsers(users.map(user => 
        user.id === currentUser.id ? { ...userData, id: currentUser.id } : user
      ))
    } else {
      // Add new user
      setUsers([...users, { ...userData, id: Date.now().toString() }])
    }
    handleCloseModal()
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <PeopleAltIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Sistema de Cadastro de Usuários
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper 
              sx={{ 
                p: 3, 
                display: 'flex', 
                flexDirection: 'column',
                borderRadius: 2,
                boxShadow: 2
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PersonAddIcon sx={{ color: 'primary.main', mr: 1 }} />
                <Typography variant="h5" component="h1" color="primary.main">
                  Gerenciamento de Usuários
                </Typography>
              </Box>
              <Divider sx={{ mb: 3 }} />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box>
                  <Typography variant="body1">
                    Total de usuários cadastrados: <strong>{users.length}</strong>
                  </Typography>
                </Box>
                <Button 
                  variant="contained" 
                  startIcon={<AddIcon />}
                  onClick={handleOpenModal}
                  sx={{ 
                    borderRadius: 2,
                    px: 3,
                    py: 1
                  }}
                >
                  Novo Usuário
                </Button>
              </Box>
              
              <UserTable 
                users={users} 
                onEdit={handleEdit} 
                onDelete={handleDelete} 
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>

      <Box 
        component="footer" 
        sx={{ 
          py: 3, 
          px: 2, 
          mt: 'auto', 
          bgcolor: 'background.paper',
          borderTop: '1px solid',
          borderColor: 'divider'
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary" align="center">
            Sistema de Cadastro de Usuários © {new Date().getFullYear()}
          </Typography>
        </Container>
      </Box>
      
      <UserFormModal
        open={openModal}
        onClose={handleCloseModal}
        onSave={handleSave}
        user={currentUser}
      />
    </Box>
  )
}

export default App