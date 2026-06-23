import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout, updateAvatar, updateProfile } from '../../store/auth/authReducer';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const AVATAR_STYLES = ['initials', 'bottts', 'adventurer', 'pixel-art', 'lorelei', 'micah'];

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.auth);
  const { likedItems, basketItems } = useSelector((state) => state.card);

  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    username: currentUser?.username || '',
    bio: currentUser?.bio || '',
  });
  const [avatarStyle, setAvatarStyle] = useState('initials');

  if (!currentUser) return null;

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const handleAvatarChange = (style) => {
    setAvatarStyle(style);
    const newAvatar = `https://api.dicebear.com/7.x/${style}/svg?seed=${currentUser.username}&backgroundColor=c9a84c`;
    dispatch(updateAvatar(newAvatar));
  };

  const handleSave = (e) => {
    e.preventDefault();
    dispatch(updateProfile({ username: form.username, bio: form.bio }));
    setEditMode(false);
  };

  const joinDate = new Date(currentUser.joinedAt).toLocaleDateString('az-AZ', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="profile-page">
      <div className="profile-container">
        {/* Left: Avatar & Stats */}
        <aside className="profile-sidebar">
          <div className="profile-avatar-wrap">
            <img
              src={currentUser.avatar}
              alt={currentUser.username}
              className="profile-avatar"
            />
          </div>
          <h2 className="profile-username">{currentUser.username}</h2>
          <p className="profile-email">{currentUser.email}</p>
          {currentUser.bio && (
            <p className="profile-bio">{currentUser.bio}</p>
          )}
          <p className="profile-joined">
            <i className="fa fa-calendar" /> {joinDate} tarixindən üzv
          </p>

          <div className="profile-stats">
            <div className="profile-stat">
              <span className="profile-stat__num">{likedItems.length}</span>
              <span className="profile-stat__label">Bəyənilən</span>
            </div>
            <div className="profile-stat">
              <span className="profile-stat__num">{basketItems.length}</span>
              <span className="profile-stat__label">Səbət</span>
            </div>
          </div>

          <button className="profile-logout-btn" onClick={handleLogout}>
            <i className="fa fa-sign-out-alt" /> Çıxış
          </button>
        </aside>

        {/* Right: Edit & Avatar picker */}
        <main className="profile-main">
          {/* Edit profile */}
          <section className="profile-section">
            <div className="profile-section__header">
              <h3><i className="fa fa-user-edit" /> Profil Məlumatları</h3>
              {!editMode && (
                <button className="profile-edit-btn" onClick={() => setEditMode(true)}>
                  <i className="fa fa-pen" /> Redaktə
                </button>
              )}
            </div>

            {editMode ? (
              <form onSubmit={handleSave} className="profile-form">
                <div className="profile-form__group">
                  <label>İstifadəçi adı</label>
                  <input
                    type="text"
                    value={form.username}
                    onChange={(e) => setForm((p) => ({ ...p, username: e.target.value }))}
                    required
                  />
                </div>
                <div className="profile-form__group">
                  <label>Bio</label>
                  <textarea
                    value={form.bio}
                    onChange={(e) => setForm((p) => ({ ...p, bio: e.target.value }))}
                    placeholder="Özün haqqında qısa məlumat..."
                    rows={3}
                  />
                </div>
                <div className="profile-form__actions">
                  <button type="submit" className="profile-save-btn">
                    <i className="fa fa-check" /> Saxla
                  </button>
                  <button type="button" className="profile-cancel-btn" onClick={() => setEditMode(false)}>
                    <i className="fa fa-times" /> Ləğv et
                  </button>
                </div>
              </form>
            ) : (
              <div className="profile-info">
                <div className="profile-info__row">
                  <span className="profile-info__label">İstifadəçi adı</span>
                  <span className="profile-info__value">{currentUser.username}</span>
                </div>
                <div className="profile-info__row">
                  <span className="profile-info__label">E-poçt</span>
                  <span className="profile-info__value">{currentUser.email}</span>
                </div>
                <div className="profile-info__row">
                  <span className="profile-info__label">Bio</span>
                  <span className="profile-info__value">{currentUser.bio || '—'}</span>
                </div>
              </div>
            )}
          </section>

          {/* Avatar picker */}
          <section className="profile-section">
            <div className="profile-section__header">
              <h3><i className="fa fa-image" /> Avatar Seç</h3>
            </div>
            <div className="avatar-picker">
              {AVATAR_STYLES.map((style) => {
                const url = `https://api.dicebear.com/7.x/${style}/svg?seed=${currentUser.username}&backgroundColor=c9a84c`;
                return (
                  <button
                    key={style}
                    className={`avatar-picker__item ${avatarStyle === style ? 'active' : ''}`}
                    onClick={() => handleAvatarChange(style)}
                    title={style}
                    aria-label={`${style} avatarını seç`}
                  >
                    <img src={url} alt={style} />
                    <span>{style}</span>
                  </button>
                );
              })}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Profile;
