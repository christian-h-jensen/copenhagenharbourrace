# Open questions about the content

Things that don't match between pages or languages. Ask the organisers before changing them, then update both `da/` and `en/`.

## 1. Address map still says "Roklubben SAS"

SAS is no longer part of the harbour; Bryggens Roklub has taken over. The text on `classes.html` (DA and EN) now says Bryggens Roklub, but the map images `img/addresses-map-da.png` and `img/addresses-map-en.png` still label the spot next to ARK "Roklubben SAS / SAS Rowing Club". The alt text says so. The images need a new version with the label changed to Bryggens Roklub.

## 2. English 8+ registration rule is missing a sentence

`da/rules.html`, 8+ rule 8, ends with "Ved senere eftertilmelding kan det ikke garanteres at holdet kan stille til start." ("For later sign-ups it cannot be guaranteed that the team can start."). `en/rules.html`, 8+ rule 8, doesn't have this sentence. The new English inrigger/coastal rule 10 (same Danish text) does. Should it be added to the English 8+ rule too?

## 3. English 8+ rules 2, 3, 4 and 8 don't match the Danish

The English 8+ rules were never a close translation. The new English inrigger/coastal rules 2, 3, 6 and 10 reuse the same English wording, because the Danish is word for word the same. Any fix has to be made in **both sections** of `en/rules.html`.

- **Rule 2 (start):** the English leaves out that the pre-starter is "i en motorbåd ved Langebro" (in a motorboat at Langebro), that the umpire is "på land" (on land), and the "ca." (approx.) before 30-45 seconds.
- **Rule 3 (no-overtaking buoy):** the English adds text that isn't in the Danish ("If two boats approach the U-turn side by side…", "will call the trailing boat to give way, in hard-to-decide situations"). It also leaves out that umpire boats are at both the overtaking buoy and the turning buoy, and that the penalty goes to the *overtaking* boat.
- **Rule 4 (times):** "floating start" should probably be "flying start" (*flyvende start*), the term used in rule 2.
- **Rule 8 (registration):** "has to be applied at 18:00" leaves out that late entries must *reach the organisers* by 18:00 *at the latest* ("senest … arrangørerne i hænde").

## 4. 8+ launching rule: Bryggens and ARK exemption

`da/rules.html`, 8+ rule 9, says crews launching from other clubs "(inkl. Bryggens Rk og ARK)" are turned away, then ends with "Bryggens Rk og ARK er dispenseret fra denne regel." ("Bryggens Rk and ARK are exempt from this rule."). The two sentences contradict each other. `en/rules.html` doesn't have the exemption sentence, so the English says the opposite of the last Danish sentence. Which is right: are eights from Bryggens Roklub and ARK allowed to launch from their own club?
