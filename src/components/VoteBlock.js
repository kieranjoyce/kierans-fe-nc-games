import { useEffect, useState } from "react";
import styles from "../modules/VoteBlock.module.css"
import {ReactComponent as UpSymbol} from "../assets/arrow_upward_FILL0_wght400_GRAD0_opsz48.svg"
import {ReactComponent as DownSymbol} from "../assets/arrow_downward_FILL0_wght400_GRAD0_opsz48.svg"
import { patchVotes } from "../utils/api";

export default function VoteBlock({ votes, review_id, setIsErr }) {
    const [voteData, setVoteData] = useState({voteChange: 0, currVote:'', prevVote:''});
    
    useEffect(() => {
        if (!voteData.currVote) {
            return;
        }
        const isVoteSwapping = (voteData.voteChange === 1 && voteData.prevVote === 'down') || (voteData.voteChange === -1 && voteData.prevVote === 'up')
        
        let votesToPatch;
        
        if (isVoteSwapping) {
            votesToPatch = 2 * voteData.voteChange;
        } 
        else if (voteData.voteChange !== 0) {
            votesToPatch = voteData.voteChange;
        } 
        else {
            votesToPatch = voteData.prevVote === 'up' ? -1 : 1;
        }
        
        patchVotes(review_id, votesToPatch)
        .catch(() => {
            setIsErr(true);
        })
    }, [voteData, review_id, setIsErr])
    
    const changeVote = (voteNum) => {
        const voteChange = voteData.voteChange !== voteNum ? voteNum : 0;
        const currVote = voteChange === 0 ? 'reset' : 
            voteNum === 1 ? 'up' : 'down';
            
        setVoteData((currVoteData) => {
            return {voteChange, currVote, prevVote:currVoteData.currVote};
        })
    }
    
    return (
        <div className={styles.voteBlock}>
            <button type="button" onClick={() => {changeVote(1)}}>
                <UpSymbol className={voteData.voteChange === 1 ? styles.upSymbolSelected : styles.symbolUnselected} />
            </button>
            <p>{votes + voteData.voteChange}</p>
            <button type="button" onClick={() => {changeVote(-1)}}>
                <DownSymbol className={voteData.voteChange === -1 ? styles.downSymbolSelected : styles.symbolUnselected} />
            </button>
        </div>
    )
}
