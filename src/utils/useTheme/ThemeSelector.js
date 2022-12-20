import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { THEME_OPTIONS } from './useTheme';

export const ThemeSelector = ({ theme, setTheme, className }) => {
    const onSelect = (event) => {
      const selectedTheme = event.target.value;
      localStorage.setItem('SNAPCAST_UI_THEME', selectedTheme);
      setTheme(selectedTheme);
    };
    return (
      <FormControl className={className}>
        <InputLabel 
        sx={{ color: 'white' }} 
        id='theme-selector-label'>
          Theme
        </InputLabel>
        <Select
          labelId='theme-selector-label'
          className='selectBox'
          value={theme}
          label='Theme'
          sx={{
            color: 'white',
            textTransform: 'capitalize',
            minWidth: '30vw',
            padding: '0',
            margin:'0',
          }}
          variant='filled'
          onChange={onSelect}
        >
          {THEME_OPTIONS.map((t, i) => (
            <MenuItem
              key={i}
              value={t}
              sx={{ textTransform: 'capitalize' }}
            >{t}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  };