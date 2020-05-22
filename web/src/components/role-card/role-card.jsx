import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

export function RoleCard({role, imageUrl, reverse = false, onClick}) {

    const useStyles = makeStyles({
        root: {
            width: 400,
            height: 220,
            padding: 0,
            backgroundColor: 'lightseagreen'
            // display:'flex',
        },
        actionWrapper: {
            display: "flex",
            flexDirection: reverse ? 'row-reverse' : 'row',
            justifyContent: 'flex-start',
            padding: 0,
        },
        image: {
            width: 220,
            height: 220
        },
        content: {
            flex:1,
            color:'white',
        }
    });
    
    const classes = useStyles();

    return (
        <Card className={classes.root} elevation={4}>
            <CardActionArea onClick={onClick} className={classes.actionWrapper}>
                <CardMedia
                    className={classes.image}
                    image={imageUrl}
                    title={`Perfil de ${role}`}
                />
                <CardContent className={classes.content}>
                    <Typography gutterBottom variant="h5" component="h2" align='center'>
                        {role}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
