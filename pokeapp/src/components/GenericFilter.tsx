import { Box, Chip, FormControl, FormLabel, FormGroup } from '@mui/material';

export interface FilterOption {
  label: string;
  value: string | number;
}

export interface FilterGroup {
  title: string;
  options: FilterOption[];
  selected: (string | number)[];
  onChange: (value: string | number) => void;
  colorMap?: Record<string, string>;
}

interface GenericFilterProps {
  groups: FilterGroup[];
}

export const GenericFilter = ({ groups }: GenericFilterProps) => {
  return (
    <Box
      sx={{
        backgroundColor: '#f5f5f5',
        p: 3,
        borderRadius: 2,
        mb: 4,
      }}
    >
      {groups.map((group, index) => (
        <FormControl fullWidth key={group.title} sx={{ mb: index < groups.length - 1 ? 3 : 0 }}>
          <FormLabel sx={{ fontWeight: 600, mb: 2, display: 'block' }}>{group.title}</FormLabel>
          <FormGroup row>
            {group.options.map((option) => {
              const isSelected = group.selected.includes(option.value);
              const color = group.colorMap?.[String(option.value)];

              return (
                <Box key={option.value} sx={{ mr: 1, mb: 1 }}>
                  <Chip
                    label={option.label}
                    onClick={() => group.onChange(option.value)}
                    color={isSelected ? 'primary' : 'default'}
                    variant={isSelected ? 'filled' : 'outlined'}
                    sx={{
                      backgroundColor: isSelected ? (color || '#d0d0d0') : 'transparent',
                      borderColor: isSelected && color ? color : undefined,
                      color: isSelected && color ? '#fff' : 'text.primary',
                      fontWeight: 500,
                      '&:hover': {
                        backgroundColor: isSelected ? (color || '#d0d0d0') : 'action.hover',
                      },
                    }}
                  />
                </Box>
              );
            })}
          </FormGroup>
        </FormControl>
      ))}
    </Box>
  );
};
