import { useEffect, useState } from "react";
import styles from "../modules/VoteBlock.module.css";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { patchVotes } from "../utils/api";

interface VoteBlockProps {
    votes: number;
    review_id: string;
    setIsErr: React.Dispatch<React.SetStateAction<boolean>>;
}

type VoteType = "" | "up" | "down" | "reset";

interface VoteData {
    voteChange: number;
    currVote: VoteType;
    prevVote: VoteType;
}

export default function VoteBlock({
    votes,
    review_id,
    setIsErr,
}: VoteBlockProps) {
    const [voteData, setVoteData] = useState<VoteData>({
        voteChange: 0,
        currVote: "",
        prevVote: "",
    });

    useEffect(() => {
        if (!voteData.currVote) {
            return;
        }
        const isVoteSwapping =
            (voteData.voteChange === 1 && voteData.prevVote === "down") ||
            (voteData.voteChange === -1 && voteData.prevVote === "up");

        let votesToPatch;

        if (isVoteSwapping) {
            votesToPatch = 2 * voteData.voteChange;
        } else if (voteData.voteChange !== 0) {
            votesToPatch = voteData.voteChange;
        } else {
            votesToPatch = voteData.prevVote === "up" ? -1 : 1;
        }

        patchVotes(review_id, votesToPatch).catch(() => {
            setIsErr(true);
        });
    }, [voteData, review_id, setIsErr]);

    const changeVote = (voteNum: number) => {
        const voteChange = voteData.voteChange !== voteNum ? voteNum : 0;
        const currVote =
            voteChange === 0 ? "reset" : voteNum === 1 ? "up" : "down";

        setVoteData((currVoteData) => {
            return { voteChange, currVote, prevVote: currVoteData.currVote };
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
                        voteData.voteChange === 1
                            ? styles.upSymbolSelected
                            : styles.symbolsUnselected
                    }
                />
            </button>
            <p>{votes + voteData.voteChange}</p>
            <button
                type="button"
                onClick={() => {
                    changeVote(-1);
                }}
            >
                <ArrowDownwardIcon
                    className={
                        voteData.voteChange === -1
                            ? styles.downSymbolSelected
                            : styles.symbolsUnselected
                    }
                />
            </button>
        </div>
    );
}
