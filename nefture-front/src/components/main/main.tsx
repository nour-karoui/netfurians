import {Button, Card, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import axios, {AxiosResponse} from 'axios';
import {getAccountAddress} from "../../services/initweb3";
import {useState} from "react";

function Main() {
    const [heroIndex, setHeroIndex] = useState(0);
    const [heroName, setHeroName] = useState('');
    const [heroPFP, setHeroPFP] = useState('');
    const [clan, setClan] = useState('Lone Wolf');
    const onAssignHero = async () => {
        const address = await getAccountAddress();
        try {
            const response = await axios.post('http://localhost:3030', {accountAddress: address});
            setHeroIndex(response.data.heroIndex);
            await getHeroData(response.data.heroIndex);
        } catch (err) {
            alert(err);
        }
    }

    const getHeroData = async (heroIndex: number) => {
        try {
            const response = await axios.get(`https://api.nefturians.io/metadata/101`);
            setHeroName(response.data.name);
            setHeroPFP(response.data.image);
            if(response.data.attributes.length) {
                const clanValue = response.data.attributes.filter((element: any) => element['trait_type'] === 'Clan');
                setClan(clanValue[0].value);
            }
        } catch(err) {
            alert('Error');
        }

    }

    return(
        <Grid>
            <Button color="success" onClick={onAssignHero} variant='contained'>
                Assign Hero
            </Button>
            <img
                src={heroPFP}
                alt={heroName}
                loading="lazy"
            />
            <Typography>{heroName}</Typography>
            <Typography>{clan}</Typography>
        </Grid>
    )
}

export default Main;