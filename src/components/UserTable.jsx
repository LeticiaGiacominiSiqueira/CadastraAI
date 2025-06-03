import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  IconButton, 
  Typography,
  Chip,
  Avatar,
  Box,
  Tooltip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';

const UserTable = ({ users, onEdit, onDelete }) => {
  // Função para formatar a data
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    try {
      // Formato esperado: YYYY-MM-DD
      const [year, month, day] = dateString.split('-');
      return `${day}/${month}/${year}`;
    } catch (error) {
      return dateString;
    }
  };

  // Função para obter a cor do chip de acordo com o sexo
  const getGenderColor = (gender) => {
    switch (gender) {
      case 'masculino':
        return 'primary';
      case 'feminino':
        return 'secondary';
      case 'outro':
        return 'success';
      default:
        return 'default';
    }
  };

  // Função para obter o label do sexo
  const getGenderLabel = (gender) => {
    switch (gender) {
      case 'masculino':
        return 'Masculino';
      case 'feminino':
        return 'Feminino';
      case 'outro':
        return 'Outro';
      case 'prefiro-nao-informar':
        return 'Não informado';
      default:
        return 'Não definido';
    }
  };

  return (
    <TableContainer 
      component={Paper} 
      sx={{ 
        mt: 3, 
        borderRadius: 2,
        boxShadow: 3,
        overflow: 'hidden'
      }}
    >
      {users.length === 0 ? (
        <Box sx={{ p: 4, textAlign: 'center' }}>
          <PersonIcon sx={{ fontSize: 60, color: 'text.secondary', opacity: 0.3 }} />
          <Typography variant="h6" sx={{ mt: 2, color: 'text.secondary' }}>
            Nenhum usuário cadastrado
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Clique em "Novo Usuário" para adicionar o primeiro registro
          </Typography>
        </Box>
      ) : (
        <Table>
          <TableHead sx={{ bgcolor: 'primary.main' }}>
            <TableRow>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Nome</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>CPF</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Email</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Telefone</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Sexo</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>CEP</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Nascimento</TableCell>
              <TableCell align="right" sx={{ color: 'white', fontWeight: 'bold' }}>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow 
                key={user.id}
                sx={{ '&:hover': { bgcolor: 'action.hover' } }}
              >
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar 
                      sx={{ 
                        mr: 2, 
                        bgcolor: user.gender === 'feminino' ? 'secondary.main' : 'primary.main' 
                      }}
                    >
                      {user.name.charAt(0).toUpperCase()}
                    </Avatar>
                    {user.name}
                  </Box>
                </TableCell>
                <TableCell>{user.cpf || '-'}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>
                  <Chip 
                    label={getGenderLabel(user.gender)} 
                    color={getGenderColor(user.gender)}
                    size="small"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>{user.cep || '-'}</TableCell>
                <TableCell>{formatDate(user.birthDate)}</TableCell>
                <TableCell align="right">
                  <Tooltip title="Editar">
                    <IconButton 
                      color="primary" 
                      onClick={() => onEdit(user)}
                      size="small"
                      sx={{ 
                        mr: 1,
                        '&:hover': { 
                          bgcolor: 'primary.light',
                          color: 'white'
                        } 
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Excluir">
                    <IconButton 
                      color="error" 
                      onClick={() => onDelete(user.id)}
                      size="small"
                      sx={{ 
                        '&:hover': { 
                          bgcolor: 'error.light',
                          color: 'white'
                        } 
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
};

export default UserTable;