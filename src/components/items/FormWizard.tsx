import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import {Grid, IconButton} from '@material-ui/core'
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

interface Props {
    sectionNum: number;
    sections: string[];
    changeStep: (diff:number) => void;
}

export default function Wizard({sectionNum, sections, changeStep}:Props) {

    return (
        <div>
            <Grid container justify="space-between" alignItems="center">
                <Grid item>
                    <IconButton disabled={sectionNum === 0} onClick={() => changeStep(-1)}>
                        <NavigateBeforeIcon fontSize="large" />
                    </IconButton>
                </Grid>
                <Grid style={{flexGrow: 1}} item>
                    <Stepper activeStep={sectionNum} alternativeLabel>
                        {sections.map(step => (
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Grid>
                <Grid item>
                    <IconButton disabled={sectionNum === sections.length - 1} onClick={() => changeStep(1)}>
                        <NavigateNextIcon fontSize="large" />
                    </IconButton>
                </Grid>
            </Grid>
        </div>
    )
}