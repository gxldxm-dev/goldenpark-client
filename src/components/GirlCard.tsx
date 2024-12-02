/** @jsxImportSource @emotion/react */
import { Typography, Box } from '@mui/material';
import { styled } from '@mui/system';

interface GirlCardProps {
  name: string;
  age: number;
  photo: string; // URL de la foto
}

// Estilos personalizados con `styled`
const CardContainer = styled(Box)`
  background-color: #fff;
  padding: 16px;
  border-radius: 16px;
  width: 200px;
  text-align: center;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.1);
  max-width: 220px;
`;

const ProfileImage = styled('div')`
  width: 100%;
  max-height: 200px;
  border-radius: 10%;
  overflow: hidden;
  margin: 0 auto 10px;
`;

const GirlCard: React.FC<GirlCardProps> = ({ name, age, photo }) => {
  return (
    <CardContainer>
      {/* Imagen de perfil */}
      <ProfileImage>
        <img src={photo} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </ProfileImage>

      {/* Nombre y edad de la chica */}
      <Typography variant="body1" color="primary">
        {name}
      </Typography>
      <Typography variant="caption" color="textSecondary">
        {age} years old
      </Typography>
    </CardContainer>
  );
};

export default GirlCard;
