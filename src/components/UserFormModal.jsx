import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  InputAdornment,
  Typography,
  Divider
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import BadgeIcon from '@mui/icons-material/Badge';
import HomeIcon from '@mui/icons-material/Home';
import CakeIcon from '@mui/icons-material/Cake';

const UserFormModal = ({ open, onClose, onSave, user }) => {
  const [formData, setFormData] = useState({
    name: '',
    cpf: '',
    email: '',
    phone: '',
    gender: '',
    cep: '',
    birthDate: ''
  });

  // Reset form when modal opens or user changes
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        cpf: user.cpf || '',
        email: user.email || '',
        phone: user.phone || '',
        gender: user.gender || '',
        cep: user.cep || '',
        birthDate: user.birthDate || ''
      });
    } else {
      setFormData({
        name: '',
        cpf: '',
        email: '',
        phone: '',
        gender: '',
        cep: '',
        birthDate: ''
      });
    }
  }, [user, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  // Formatação de CPF: XXX.XXX.XXX-XX
  const formatCPF = (value) => {
    const cpf = value.replace(/\D/g, '');
    if (cpf.length <= 3) return cpf;
    if (cpf.length <= 6) return `${cpf.slice(0, 3)}.${cpf.slice(3)}`;
    if (cpf.length <= 9) return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6)}`;
    return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6, 9)}-${cpf.slice(9, 11)}`;
  };

  // Formatação de CEP: XXXXX-XXX
  const formatCEP = (value) => {
    const cep = value.replace(/\D/g, '');
    if (cep.length <= 5) return cep;
    return `${cep.slice(0, 5)}-${cep.slice(5, 8)}`;
  };

  // Formatação de telefone: (XX) XXXXX-XXXX
  const formatPhone = (value) => {
    const phone = value.replace(/\D/g, '');
    if (phone.length <= 2) return phone;
    if (phone.length <= 7) return `(${phone.slice(0, 2)}) ${phone.slice(2)}`;
    return `(${phone.slice(0, 2)}) ${phone.slice(2, 7)}-${phone.slice(7, 11)}`;
  };

  const handleCPFChange = (e) => {
    const formattedValue = formatCPF(e.target.value);
    setFormData({
      ...formData,
      cpf: formattedValue
    });
  };

  const handleCEPChange = (e) => {
    const formattedValue = formatCEP(e.target.value);
    setFormData({
      ...formData,
      cep: formattedValue
    });
  };

  const handlePhoneChange = (e) => {
    const formattedValue = formatPhone(e.target.value);
    setFormData({
      ...formData,
      phone: formattedValue
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ bgcolor: 'primary.main', color: 'white', py: 2 }}>
        <Typography variant="h5" component="div">
          {user ? 'Editar Usuário' : 'Novo Usuário'}
        </Typography>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ py: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'medium' }}>
                Informações Pessoais
              </Typography>
              <Divider sx={{ mb: 2 }} />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                label="Nome Completo"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                label="CPF"
                name="cpf"
                value={formData.cpf}
                onChange={handleCPFChange}
                fullWidth
                required
                variant="outlined"
                inputProps={{ maxLength: 14 }}
                placeholder="000.000.000-00"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BadgeIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                label="Telefone"
                name="phone"
                value={formData.phone}
                onChange={handlePhoneChange}
                fullWidth
                required
                variant="outlined"
                inputProps={{ maxLength: 15 }}
                placeholder="(00) 00000-0000"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'medium', mt: 2 }}>
                Dados Complementares
              </Typography>
              <Divider sx={{ mb: 2 }} />
            </Grid>
            
            <Grid item xs={12} md={4}>
              <FormControl fullWidth required>
                <InputLabel id="gender-label">Sexo</InputLabel>
                <Select
                  labelId="gender-label"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  label="Sexo"
                >
                  <MenuItem value="masculino">Masculino</MenuItem>
                  <MenuItem value="feminino">Feminino</MenuItem>
                  <MenuItem value="outro">Outro</MenuItem>
                  <MenuItem value="prefiro-nao-informar">Prefiro não informar</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <TextField
                label="CEP"
                name="cep"
                value={formData.cep}
                onChange={handleCEPChange}
                fullWidth
                required
                variant="outlined"
                inputProps={{ maxLength: 9 }}
                placeholder="00000-000"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <HomeIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            
            <Grid item xs={12} md={4}>
              <TextField
                label="Data de Nascimento"
                name="birthDate"
                type="date"
                value={formData.birthDate}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CakeIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2, bgcolor: 'background.paper' }}>
          <Button 
            onClick={onClose} 
            variant="outlined"
            sx={{ borderRadius: 2 }}
          >
            Cancelar
          </Button>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
            sx={{ borderRadius: 2 }}
          >
            Salvar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default UserFormModal;