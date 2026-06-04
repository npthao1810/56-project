# Features Research

## Table Stakes (Must Have)
- **Local State Persistence**: All progress (stamps, points, unlocked quizzes) must survive a browser refresh.
- **Passcode Verification**: A mechanism to input a code and validate it against a pre-defined set of answers.
- **Time/Date Checks**: System must check current time against predefined deadlines (e.g., max 1 bingo/hr, global 6 PM deadline).

## Differentiators
- **Bingo Logic**: Detecting when 3 contiguous stamps have been collected to trigger a "Bingo" reward.
- **Chat-Bubble UI**: Visualizing quizzes as a conversation rather than a standard web form.
- **Image Support**: Capable of rendering rich media inside the quiz bubbles.

## Anti-Features (Do NOT Build)
- **Backend/Database**: No server-side logic; keep it completely static.
- **Authentication**: No login required; it's a single-user private URL.
