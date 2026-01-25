import SvgIcon from '@mui/material/SvgIcon'

export function PokeapiIcon() {
    return (
        <SvgIcon sx={{ height: { xs: 40, sm: 100 }, width: { xs: 40, sm: 100 }, mr: 2}}>
            <image href="../../public/pokeapi.png" height="100%" width="100%" />
        </SvgIcon>
    )
}