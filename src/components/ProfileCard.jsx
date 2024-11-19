import PropTypes from 'prop-types';

const ProfileCard = ({profile}) => {

    return(
        <div className="card mb-5">
            <div className="card-body">
                <p className="card-text">
                    <strong>Nombre:</strong> {profile.name}
                </p>
                <p className="card-text">
                    <strong>Apellido:</strong> {profile.surname}
                </p>
                <p className="card-text">
                    <strong>Username:</strong> {profile.username}
                </p>
                <p className="card-text">
                    <strong>Email:</strong> {profile.email}
                </p>
                <p className="card-text">
                    <strong>Fecha de nacimiento:</strong> {profile.birthday}
                </p>
            </div>
        </div>
    )
}

// Validación de props
ProfileCard.propTypes = {
    profile: PropTypes.shape({
      name: PropTypes.string.isRequired,
      surname: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      birthday: PropTypes.string.isRequired,
    }).isRequired,
  };

export default ProfileCard;