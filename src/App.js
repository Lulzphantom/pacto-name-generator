import { useEffect, useState, useRef } from 'react';
import { getPactoName, getCharColorByIndex, exportToPng } from './utils/pacto';
import {
    Container,
    Box,
    TextField,
    Button,
    Checkbox,
    Typography,
    FormControlLabel,
    Stack,
    Slider
} from '@mui/material';
import { TextDecrease, TextIncrease, GitHub } from '@mui/icons-material';
import './App.css';
import ave from './assets/ave.svg';
import logo from './assets/logo.svg';

const App = () => {

    const [name, setName] = useState('');
    const [pactoName, setPactoName] = useState([]);
    const [hashtag, setHashtag] = useState('');
    const [hasHashtag, setHasHashtag] = useState(false);
    const [logoAve, setLogoAve] = useState(true);
    const [logoPacto, setLogoPacto] = useState(true);
    const [fontSize, setFontSize] = useState(0.6);

    useEffect(() => {
        setPactoName(getPactoName(name || 'Tu nombre'));
    }, [name]);

    const pactoRef = useRef();

    return (
        <Container component='main' maxWidth='xs'>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                }}
            >
                <Typography color='primary' variant='h4' className='title'>PACTO HISTÓRICO</Typography>
                <small className='subtitle'>Generador de nombre</small>
                <TextField
                    label='Nombre'
                    variant='outlined'
                    style={{ backgroundColor: '#fff', margin: '1em 0' }}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    autoFocus
                />
                <Box>
                    <FormControlLabel control={<Checkbox checked={logoAve} onChange={(e, c) => setLogoAve(c)} />} label='Logo (Ave)' />
                    <FormControlLabel control={<Checkbox checked={logoPacto} onChange={(e, c) => setLogoPacto(c)} />} label='Logo (Pacto)' />
                    <FormControlLabel control={<Checkbox checked={hasHashtag} onChange={(e, c) => setHasHashtag(c)} />} label='Hashtag' />
                </Box>
                {
                    hasHashtag &&
                    <TextField
                        label='Hashtag'
                        variant='outlined'
                        style={{ backgroundColor: '#fff', margin: '1em 0' }}
                        value={hashtag}
                        onChange={(e) => setHashtag(e.target.value)}
                        fullWidth
                    />
                }
                <Stack spacing={2} direction='row' sx={{ m: 2 }} alignItems='stretch' style={{ width: '100%' }}>
                    <TextDecrease />
                    <Slider aria-label='textSize' step={0.1} min={0.1} max={1} onChange={(e, v) => setFontSize(v)} value={fontSize} />
                    <TextIncrease />
                </Stack>
                <div className='pacto' style={{ fontSize: `${fontSize * 5}em` }} ref={pactoRef}>
                    <div style={{ position: 'absolute', height: '100%', width: '100%', background: 'white', zIndex: -1 }} />
                    <div style={{ opacity: name.length ? 1 : 0.6 }}>
                        {
                            pactoName.map((char, index) => (
                                <span
                                    className={`font-pacto-${getCharColorByIndex(index, pactoName.length)} ${index > 0 ? 'margin-left-pacto' : ''}`}
                                    style={{ position: 'relative' }}
                                    key={index}>
                                    {char.toUpperCase() === 'O' && index === pactoName.length - 1 ? '' : char}
                                    {
                                        index === pactoName.length - 1 && pactoName[pactoName.length - 1]?.toUpperCase() !== 'O' && logoAve &&
                                        <img src={ave} alt='ave' className={'pacto-bird hue-5 extra'} />
                                    }
                                </span>
                            ))
                        }
                        {
                            pactoName[pactoName.length - 1]?.toUpperCase() === 'O' && logoAve &&
                            <img src={ave} alt='O' className={`pacto-bird hue-${getCharColorByIndex(pactoName.length - 1, pactoName.length)}`} />
                        }
                    </div>
                    {
                        hasHashtag &&
                        <span style={{ fontSize: `${fontSize * 0.6}em`, opacity: hashtag.length ? 1 : 0.6, zIndex: 1 }} className='font-pacto-5'>#{hashtag || 'hashtag'}</span>
                    }
                    {
                        logoPacto &&
                        <img src={logo} alt='O' className='pacto-logo' />
                    }

                </div>
                <Button fullWidth variant='contained' disabled={!name} style={{ margin: '1em 0' }} onClick={() => exportToPng(pactoRef.current)}>Descargar</Button>
                <Box display='flex' justifyContent='center'style={{ width: '100%', margin: '1em' }}>
                    <a href='https://github.com/Lulzphantom' target='_blank' rel='noreferrer' >
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <GitHub /> Lulzphantom
                        </div>
                    </a>
                </Box>
            </Box>
        </Container>
    );
}

export default App;
