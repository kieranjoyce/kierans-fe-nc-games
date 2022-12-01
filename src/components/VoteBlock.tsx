import { useState } from "react";
import styles from "../modules/VoteBlock.module.css";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { patchVotes } from "../utils/api";

interface VoteBlockProps {
    votes: number;
    review_id: string;
    setIsErr: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function VoteBlock({
    votes,
    review_id,
    setIsErr,
}: VoteBlockProps) {
    const [voteChange, setVoteChange] = useState<number>(0);

    const changeVote = (voteNum: number) => {
        const prevVote = voteChange;
        const voteNumAdjusted = prevVote !== voteNum ? voteNum : 0;
        setVoteChange(voteNumAdjusted);

        const isVoteSwapping =
            (voteNumAdjusted === 1 && prevVote === -1) ||
            (voteNumAdjusted === -1 && prevVote === 1);

        let votesToPatch;

        if (isVoteSwapping) {
            votesToPatch = 2 * voteNumAdjusted;
        } else if (voteNumAdjusted !== 0) {
            votesToPatch = voteNumAdjusted;
        } else {
            votesToPatch = prevVote === 1 ? -1 : 1;
        }

        patchVotes(review_id, votesToPatch).catch(() => {
            setIsErr(true);
        });
    };

    return (
        <div className={styles.voteBlock}>
            <button
                type="button"
                onClick={() => {
                    changeVote(1);
                }}
            >
                <ArrowUpwardIcon
                    className={
                        voteChange === 1
                            ? styles.upSymbolSelected
                            : styles.symbolsUnselected
                    }
                />
            </button>
            <p>{votes + voteChange}</p>
            <button
                type="button"
                onClick={() => {
                    changeVote(-1);
                }}
            >
                <ArrowDownwardIcon
                    className={
                        voteChange === -1
                            ? styles.downSymbolSelected
                            : styles.symbolsUnselected
                    }
                />
            </button>
        </div>
    );
}
