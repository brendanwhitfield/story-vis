

//dev mode omits animations, 'cause they get annoying after a while... 
var animations = true;
var image_search = false;

//search API
var query_url = "https://api.datamarket.azure.com/Bing/Search/Image?";

//animation for the prompt
var intro_delay = 600;
var intro_text = [
	{ time: 0,    key:'T' },
	{ time: 150,  key:'e' },
	{ time: 359,  key:'l' },
	{ time: 720,  key:'l' },
	{ time: 1040, key:' ' },
	{ time: 1367, key:'m' },
	{ time: 1511, key:'e' },
	{ time: 1599, key:' ' },
	{ time: 1727, key:'a' },
	{ time: 1871, key:' ' },
	{ time: 2039, key:'s' },
	{ time: 2263, key:'t' },
	{ time: 2391, key:'o' },
	{ time: 2535, key:'r' },
	{ time: 2615, key:'y' },
	{ time: 3300, key:'<br>' },
	{ time: 3700, key:'<br>' }
];

//keystroke animator (wait times in milliseconds)
var key_min_wait = 10;
var key_max_wait = 300;

//various RegExps for splitting and straining the input text
var splitlist = new RegExp("[\.,!\?;\n]", "m");
var punctuation = /[\$\uFFE5\^\+=`~<>{}\[\]|\u3000-\u303F!-#%-\x2A,-/:;\x3F@\x5B-\x5D_\x7B}\u00A1\u00A7\u00AB\u00B6\u00B7\u00BB\u00BF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u0AF0\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E3B\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]+/gm

//creates a RegExp of the form:
// "^(word1|word2|word3)$"

var blacklist = new RegExp("^(" + ([
	"the", "be", "to", "of", "and", "a", "that", "have", "i", "is",
	"it", "for", "not", "on", "he", "as", "you", "do", "at", "this", "but",
	"his", "by", "from", "they", "we", "say", "her", "she", "or", "an",
	"will", "my", "one", "all", "would", "there", "their", "what", "so",
	"up", "out", "if", "about", "who", "get", "which", "me", "when",
	"make", "can", "no", "just", "him", "we", "it", "into", "your", "some",
	"could", "them", "other", "than", "then", "now", "only", "come", "its",
	"it's", "also", "use", "how", "our", "even", "new", "want", "because",
	"any", "these", "most", "us", "was"
].join("|")) + ")$");


/*
	Sample texts
*/

var samples = [];

//The City in the Sea - Edger Allen Poe
//Periods added for splitting purposes
samples[0] = "Lo! Death has reared himself a throne. \
 \
In a strange city lying alone. \
Far down within the dim West. \
Where the good and the bad and the worst and the best. \
Have gone to their eternal rest. \
There shrines and palaces and towers. \
(Time-eaten towers that tremble not!). \
Resemble nothing that is ours. \
Around, by lifting winds forgot. \
Resignedly beneath the sky. \
The melancholy waters lie. \
 \
No rays from the holy heaven come down. \
On the long night-time of that town. \
But light from out the lurid sea. \
Streams up the turrets silently. \
Gleams up the pinnacles far and free. \
Up domes — up spires — up kingly halls. \
Up fanes — up Babylon-like walls. \
Up shadowy long-forgotten bowers. \
Of sculptured ivy and stone flowers. \
Up many and many a marvelous shrine. \
Whose wreathéd friezes intertwine. \
The viol, the violet, and the vine. \
So blend the turrets and shadows there. \
That all seem pendulous in the air. \
While from a proud tower in the town. \
Death looks gigantically down. \
 \
There open fanes and gaping graves. \
Yawn level with the luminous waves. \
But not the riches there that lie. \
In each idol's diamond eye. \
Not the gaily-jeweled dead. \
Tempt the waters from their bed. \
For no ripples curl, alas!. \
Along that wilderness of glass. \
No swellings tell that winds may be. \
Upon some far-off happier sea. \
No heavings hint that winds have been. \
On seas less hideously serene. \
 \
But lo, a stir is in the air!. \
The wave — there is a movement there!. \
As if the towers had thrust aside. \
In slightly sinking, the dull tide. \
As if their tops had feebly given. \
A void within the filmy Heaven. \
The waves have now a redder glow. \
The hours are breathing faint and low. \
And when, amid no earthly moans. \
Down, down that town shall settle hence. \
Hell, rising from a thousand thrones. \
Shall do it reverence.";

samples[1]
