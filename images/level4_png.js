/* eslint-disable */
import asyncLoader from '../../phet-core/js/asyncLoader.js';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAEsCAYAAAB5fY51AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAALoJJREFUeNrsnQlcVGX3xw+7oizKooIIuWMqLuWWhla+pm+pab4t7rlUpqi9muvfJU3Nyq0ss3LLzLcyUctyh9y3FFNRUSEJkEUFQRDZ/vc8Msgwd2buwACz/L6fzzhw7zN3Zu6MP8753fOchwgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABWGvZNTV77hTAAAzEGwovmGMwEAMHWxmiDdCgpvE3BGgDGxwSkARhQrd+mOIyv3wk2p0u2x3OzsVJwdYAzscAqAsbC1t39eugsoJlaXpFtifl7eJZwdAICpRlpz+IYzAYz+RxGnAAAAwQIAAAgWAMBaqZSrhBs2fLu0UaNGrZSOj4uLI19fX8J48xi/fMWKAL4fHxISg3NkmeOjoqLODhkyeKJVqOTRo8cOFBjAhQsXCzDefMa/P2+euOEcWe54/j+MlBAAACBYAAAIFgAAQLAAAACCBQCAYAEAAAQLAAAgWAAACBYAAECwAADAvjKelOctXbwYqXj833//bdDxMb5yxycnJ4t7fMaWO57/D1uNYPEky2bNAg16DMabz3gvLy+cIwsff/fuXaSEAAAAwQLACojLTLL492iPjxkA82bfzWMUemMvxWUl0c/BKyBYAADTIj3nHm2N3UvfXt8uRVaJYtuztTsgwgIAmA4nb/1FW2/so1BJrErS1K0+BAsAUPnR1OH7ETR+78dF0ZQcECwAQKVxKe06bZBSvn03jwrR0odvVW8IFgCgYgmN3ScJ1TYhWIaACAsAUKGpX7/wEJ1pnzWLFYM6LABMBBeHarSu08JSiY81pIOVFmFhLqFlj8dcwrKNn+I+hL6330W7bx1VfDyPBy5q5xtzCY0I5hJa9njMJSz7+Pb0hPCxFp3/StGxujRsT81qB1bY68dcQgCAGkPq91GcHlpLSgjBAsBE4ehK6ZVCazHdcZXQjIiJiaHQ0FA6f+YE2RVkF22/l1+VRo4cSV27dlUbz2N3//4r5WXeFr9nZudQ247PULt27XEyTRxVaYMS2nm2sJrzAsEyA1JTU2n61Ml05dRe6vi4Lz3p7aK2Pyv7Lq1bHEKTxufSx8s/F9v+b0oItfBxoKCGUqpQbPityFCavmEFdeszlGbPno2Ta4JwVLXw/GqN7XwVkdPElZc3qW33qVoLggVM5C+tFCUt+2AK/atNHQrq1lR2TFUneyFkHR8n+mTGKHJ2cqBBT/vLjvVwrUqvPduErkTupF7PH6JNm38kd3d3nGgTgWuxxp38QLay/bN2M+lJjxYiohp7Yn7RGF9nb6s5P/CwTJhly5bR9yum02td6wuhUcILnRrSM2399Y5r7FeTOvvn0OBXeosIDpgG407Oly0cfc3lX0KsGL5fX6xey5pSQgiWiTJx4kQ6u3uNIvEpLSyCrWrn0+uvDsAJNwHYZD+R8pfG9r5+z1H/Wt3VtrFYsWhxSxlrSgkhWCbIzp2/0p3L+0SaV5xbd7OM/lx1vV0o0P0uzZ07Fye+MlN/LSY7C9O05qNkH8Oe1qdSmoiUEFQaYWFh9PvmlRpiFXE1ifaf/rtcnpPTw1O7N9LZs2fxAVQCukz2T5+cKe4BBMvkYC9pSsgIGlDCXP8nKZ2uxN7W2G5Mnm0bQJPGj8GHUMHoM9mtKXpSAuYSmtD48ePGUJ+Ofhrb9/0ZQ//ppnvaRFZ2rrhaWFr4sUF18kRqOGDAf8r0fjGXUPn42XGrKC5L02QfWeslqpZoTxcTI03y9WMuoR4sfTyngjULEsnDVd1kP3ohjlo1rKVXjGKT7gqPq2QqaWhquGbLBho/frxGqQPmEhp//Pb8Q3Qh65rGdjbZ3209wqRfP+YSWjkLZ/1X9opgRFTSw+JPBWLDHldZjfnOzTxp+fLl+EDKGe7EYKjJDiBYJsG6deuouY9mBMXiw0KklDbN6tMfEfFlei38fDulKAuUH2yyf5+xS2M7THYIllnw/ZpPZYVJRFeNlJuu6fcyyatWXeFnlTXKYhEFxgcmOwTLIqMrVYSltMKd8a3lRZ2faCmuKJY1ytq4djU+nHJAWyX7VCkNVFWyAwiWyfLL1h+0pn2GXvUrsHWk9kGBwoAvKx52qajLMjK6Ktl5UjOAYJk03C7GLj3GKMfiWq2WTRuSa3VnoxyvY3NfmO9GpDSV7EATdGuozC9xaKhej+qXI1eL0kPuwqAt6rp55z59tWhw0diSaaEh5r0qukv88yQ+JCOASnYIlkVw+uh+6lxPu0fFnRdU/BB+nVYvmqk9wrqZUhRdjXtjaIl9yRSZmCJ+TkxOJgfbAopPiBP+GM8l1CZmAV5OQlQbN26CD6uUwGSHYFkMCdf+IqqnbLpNjZq6Z+TXre1Z9HP7IPVjlvy9uMhFXvubjkdcoqTEf8jTxVatSJXrv7hjKQSr9Ggz2bmSHSY7BMts4Mp2pWkap3eBDRqpbbubkUkrNmwV9zPHDFTsXakex/DjWOi6P9VWbHMpSKIfDkQWRXccgcWcP4oPq5ToMtmfd+qEE2QugoW5hER79+4V6ZgS2FDv2169Cn7LroM0rF8PIVSR125ojaLkBCtkyEviMRxZqR7HqWJgMxfy83KlXkOnSIIaToeOniAXx3z66acf6eWXlffMwlxCosP3I2jDP5omez37WtTHtrPZv1/MJdSDpY2/d+8e+SmsseLFI0oK0vD+PfSmfLpEq+RjsjIzpH+rU7adCw0dOlTc+ComN/dLPXyYZs2apfj41j6XkE32r49s1djP5vo3wQuFb3XRIdKs3y/mEloZmbduKB+bI/8xvbf4K2rz0jsiWlIqVL3fnkXdhkzWeEzegwxx79OgZdG2gIAA2vn7HvR8NwCY7BAsq4cr2DXSxJspFLrvmIi+1m7Zpeg4LFL3sh6Qnb0D7Tl8umg7p4Z+3q4P5y42fVztMSxWs2fPwYegEFSyQ7AsksSEf8r0+LjEFLKxsRE/xyeVbSrO8YhIcQGAvbJWrVrhwyklqGSHYFksqsVNS0tgg3qUn58vfm5av67CSM2TCgryKT8vT/xcHC5l4Ck9JRdjBcpAu5iKAWUNZgpfHVz03+G098gZcdVPCVzCsHLWOyKd7N+ji8b+snZ5sFbQLgaCBXSGZw/vWHTkhIdhUeJ2MxyJFVFA1L1D26KfyUb9MQ2atcG5NRCY7EgJrQJnj3oGP6ZACoDy79lQflbhTfq5IFd7NMVmPNdrFT02s8Rjs23wQZQRmOwQLKvAkFKBqzExIiISAlNAahGTxrZCuISBoyxuNyOGyowryJH+ycdnUVqmn1kGkx0poXXA5QhK4Skyd9MzqbqtjBdSoP1xq94f/2jKjrZxBWWL+qwVbhcTGrtXYztMdkRYFknDZm0Vj+WSg8joG2Rjp7lPbJPJ7Fiois8vtHEqkP/0pcfHxccZHPVZM2yyTz+zVGM7THYLjbAwl5AoJydHcQtkD7eqdPHq3w+n07BnlVuoUHYFdOnGDXVjXQs2DtLNtoAK8gofK/1sY/8wdbxzO0naUJOioqJkPxesS/gINtdD4j+S3TfJezClxdyiNLpl8d9pzCXUg6WNf+655+iH5b8pEyxpTNjFh18oFhmyfxgtcYX67nPxFBCfS4mx1yn3/j1yts8nl2rO1Kyhf1GkxYLGwqSajlN8HuG6n3cVrWVYzTZL6/vCuoQP6RceIntFkNvFDGj7gtV8pytrLiE8rEqCCzTnT7qtaM1B8RfwRrTGNhaizfvP0tq1a9W286Rlvql+PnXweuHP8dTM26FIsFjE/ow4SwOfQ78rJbDJzulgSdAuBoJlFdRpwJe9lZnv3FiP5/9x7yoVHD31ateIhg8friZaPGmZb8Xh1XmcM+PU6rbeXbCS+nVpgA9CAfpM9tioGzhJFQBM90qkbcdnFK/UzJHY/37dr7GdBYyjJhat1NRUjf28LWTsO5QceURNrGYvX0tPNXFV6xEfe/0yPhQZYLIjwgKcSvTtS1O2r5Zdol72r0tuuugMWnIqDgtRs2s3aPSgl8m3UQsKDg4W28PDwyk94RoN6d1NrYUyi5VdTgrV9fZVO45dQTY+lBKwXzX0yDTZfahkh2BZFZy2ZTp4Kh7PwrZx32lREFqyLTL7WYveHVporj9c7WbcizzV5tF0G97HaSBHViXFiuEWM9y6GROgH8FiJWeyo5IdKaFV0v+1NxSv1MxXC+t5OomIipv38VXCkrCIsalesqMo+1+jps6n3u1qaW3NLHq4F5r1QLfJjkp2CJbVpoWHLqYoHl+/jovoX8VV7Hw///PvROSkDRa1cXOX0dGj+2nkv5vrXE2ahSwiIgIfCj1sF4NKdqSEoARcXf7aG+Po6O41WmuyuO0L96qKuJZMLVzrEdWKF9vZy+L0kEXrUWQVKJr7caHpniN/Uo69C9Wt7UuptxOLFmXl1E9OuDjSc/LEhGiOqlbf+VljO0x2CBaQmDBhAoUV6/QZEXGO/vfJUnqj6qNlwEa7+FO4a3XaYyeJXIYtrQ/dS0P7PifM9MXvjSoqDOVCUG7Ox4Wj3Tu3pScHjKfXPHzIVTpGnXZtKcXTndKzs+k/b7yh8Tq426i1T8+ByQ7BAgpQGd2paWm0evb79KGHP7nYqX88wa4edDrhOjlWc6U9v5+g5zq2lsTJQ+zT5l093fpxuhadSIvqNCSX2DtE0i387i1afyKE6g/6D40bN47c3dzwARQCkx2CpQHmEmrnnREj6P37jhpipeLdOvXpw5vR1Kx2XZrx0RpaMfcdcq2mfRFVFrKOTVrR5ugrNMq7XpHwceFDwo+76M2ft9PAOf9HDRs2NNr7Nde5hJwGypnsT1UJoifuN9b5fqzpO6r6P2w1goW5hPLMmz+f3k4vIJcquj+WMV5+NCHmEj1Wpx7NXbGRZocM0ipanZ9sTtH7r8juq+PgRNPIiea+OZbm7NpBQS1bGuX9muNcQq5k331Vc5VrNtmXdJquyLeypu801iW0cvgvXNQXa6hxFf3/MTj6+iagOTncuUUZf6dSyOyVFJco3yGArxLez9Xdq322byOaNniYSEetEVSymw8QLBNh244d9Jqnr95xv6QmUXreQwGaUvsxapOTRznJ92jK7C9p6pK1tPfoWTrx12XauvcI9Rwxg+5EpdDNe3dFGqiLYXlOIsKzNmCyQ7BAaf7K794nUjR98JjNt+KLfucrgLNq+pB/5gOKPvc3/bh+N+399qBIAwfXb0tuTlXJJf2u3siN99//3zYK/+MPqzrv2kx2bhcDkx2CBbTg6FNb0bi21dxEhKWKslQixtHWEg8/Cs63IaekBCqIj6WEqAvUM7dA7FMCm/IfjptgNamhznYxLmgXA8ECWmnzVCc6fU+ZUHDqWDzKUsHe1gvu3kJ4VDcWuKL0J0//uoPWkhqiJzsEC5SBIYMH0yGF3RI4omLxSchR3l2Bva/wdP1zFq0hNYTJDsECRiC2Xm3FIsTR0/cpymthwu7eUou2rDU1hMkOwQJGwuWvy4pFiNM/vl25f0/ReB6nxNS39NQQlewQLGAEOAXr6lJTiJDSKOtVDx9anaS/NS97Y0qjK0tODdEuBoIFjETEuXPUuGp1IUKfJFxXHGV15fmFesz6P6X9LrZ2Br8mVWqYlpZq9ueXDXaY7OYP5hKayPiz+w7Q04Upm0qElERFfFVw0o1InWOj8x7Qg8cb0y/Xb4rxhuCZkiq6R7i5Ke/iYGpzCW85pdPG7F0a2+0e2NCY6v1kF5CwtrmBmEuoA8wllAl1/0mQ/nVWLEKcNrKRfiUrg9Jzc3QKXEDb1vT59q00YtQounL0vKLpPwz7Xgcd8+h5V1eznUvIftXwvW/I7lvTbYFO3wrfUe1gLqEVw3/dPFLU0y6uYP9eptaKyxmWpv5De56oQy8sGE2fbPqAfBvV1SlC3AeL+earr+hI51aKjHp+nh8cs2jDggm04/uv6ezZs2Z5bmGyWxYQLBOAje2S0RH/zsJSvNiTf5+Sm0gTl06ksQNfLOqFNWH8YNp096bWKMnf/9GqPMtWfaFXtPg530u+RuMnDxPNAD+YOIw+WzTL7EQLJjsEC5QDfx4+IhshvcvTbW5GFwnPMptU+lyKeEq2kuGuo05dmtGp9DuaqeOD+2qCxYwOCdEqWiqxmjnn7SJBFP/5Rw8wK9FCJTsEC5QTCSdOy27nq4AsZNwhdOn9RFmxUsH93Tfb35ONsIKCgjS2y0Va7IOtcM6kL76YSYH1/TQjFkm0pk542+RFS1cl+/pOC1HJDsECpYX9K88U7WUDKi+rQUYe7Tl0WuexJk4YTF8mRKtty3SuorUF8pwPF9EXLjZi2s5b0X/R+U4B9OG8cTo7mC56dxiNGTnUZEVLVyU7xAqCBcoI+1dt9JQvzK7bmCbVbUQR/9svFprQBi+m6tQ9iC5nphdt8w5sonU8C9nW33+jlks/oFX7dtHxiCs6lwxjuOXy57PG0OL5syk11fTqs7SZ7DMajxbpIIBggTIKlr56K9WUmjdr1KUlC7/RKSrD+vWg1feTi37PrqV7ZWkWrd4vvihWzPn86/U0fcUmRaL13pBeNOjVASYlWrpM9tb5jfBlg2CBspJxWvnCpexp/be6D02eu1KnmIwc9xp9lxQrfveo66v4+Cxam37aRos37FQkWm/370qzZs4wifOoy2Rf0HoCvmgQLFBW2L8KuJNh0GN8HKvQKxkOYvFUbfBSXyktfCksLUXjCqE+eF1CjrRYtHSln6oU9PFaDhQaGlqp51GfyQ4gWKCC0kE5nnCpQR4nomnLroNax4x/8xU61MCV9u3+nWJiYspNtLo/1ZY2ff0ZTZw40eDnMQYw2a0LzCWsxPEHd++hd6qU7j/UQG8/+vh/+8UKzxzpyKVsqhWhl815l/Kr16HBQ4dTtWrVFL/+hR9+TNOmTKb3hvSUfQ4Vi94dWvQ8rnUDKen2HXJ0cKiQz3hm8heyJvsgpx6UH5dNF+MiLfo7VFnjMZdQD5Y4vuDSVVLNHywNbMLPWfgNfbJsihAoOXg712ixoCyYO5V6vTyI2rVrr/j1hx88RCFj3ylKAbWhep5/bqbQ27O/o1eGjCj3c8oTmrWZ7NNbj7OK71BljcdcQiuD28kY6l9peDQKTPjigsKRUHLkEZoxwzCj/K0xY+mnI1d1pqAquOp+x5fz6NzhPbRu3bpyO3+62sXAZLdcIFiVRGn9q5IoMeGL079HFxrZqy31efHfBpUkrF27li4m5SgSLYbTURbHuXPnGv3ccVQl1y4GJjsEC5QTJ3/fbVDLYl0oMeGLw6nd3FG9qddzwQZVrLNoeQV2Uvw8LI7OmXE0fPhwo503mOwQLFDB8OIONmfOG/WYbMLrq4QvmSJuXDyJ5k8NMSh1GzZsmBCtFRu2Khatlzs1LPLByoq2SvYFrSeikh2CBcqDP6R0UN/S8aVBVQmvVLSKp26GREEsWn2HhVDI4g10POKSooiuR5BPmUVLVyV7X79n8cWCYIHyYP+vO43iX5WETfg5bvUobN4GmjRtqSIxKR4FvfB8dw1fi38/efIEhYWFqe3r2rUr/fL7Hsqu0YjGvP+5uDpYnqKFSnYAwaok0sIOl9uxWbQ4PQy+U0AnYrNo7IKvFXlOLCjzx7xMr/btKcSJi0BZXOZMeIMcb1+hhDN7aNJbQzRMdI62Nof+RltP3hBpoq4pPfwcHRu4G+xpoZIdqLDHKahYtu/YQa3y7cr9ebjP1colS8TPLECzVq2kxzycRDSlq2aLOzFs+W0T7ZOE5w0xtkPRfp7yw1EbC9mKzx6VUnBl/NKlS4XIjR/3DnVu5iueRw4+xj83k0VlPD9GHzDZASKsSk4Hy8O/0gWnbxs3/0j9R02iNbvPiUhIVwrHYjO8fw81YWOhUpVO+FXLkTXqAwICaNuOXykhpzoN/O9CrV4aH9/H8R4tW7ZMHIejNk47S8ICiHYxABFWZaeD1ct/OfTchgEa27gbA0dG4eHhtFYSCrusWzSkdzdR7KkPjoy4vzuLVvK9PDowbbHWsTVq1qROz/aiU/G5tHXfjzT29X9rRHUsWkLQJDFq1bq2JIhnpHR0MwW27iC8snvJsXQh+grdmaJZXY92MRCsCsVa5xIePXa0QtJBxkHHXL7MzCyaPPk9IQzLly+TxOEGDXzxGSFKumBhW/X+eOGJcVsZroCXQ7Uu4YAB/5GipHY0fuEH9HTLABG1Faf4VB+eRM03FXczmtIrn56nkmfL44GLmCeIuX6VOx5zCfVgCeO/+GABjaigdND+sXo6X6NqX6dOHcU9p2bcvK9tEz+t/lPx6IhTxB9//IFmz56tsb/4uoR869XroZE/87Ol9OJTzbUKo+qq5sWrf9PXf/5BriHqr5/9qp09vy7yrTDXr/LGYy6hhcN/wfIPHq+w5zOkcR+jutrXqGMvmrpkvd4Gfiw6sZGnFR+ffTRuDpho46X1qiUL1byVG+mrB2eoxrSWZFfNQW0/THYAD6uCWLpwEb3q4WP04/LVQF7tJs62gOIf3Kezt5PFlJ8Ofz8mRNLQBn59+/YV5jn3bB/Yo53ODg3Vq9iLtJKvEiplwoQJNPLV3rL7OrQKpLWXj1KVx1wp8euL1MrNhzwyHcnHxZ0cmzSlpr1hskOwQLlz9epVytm5j1y86xnleLzsV1j6bcqq50Npbrb0xLPdqU+XLmrRXGZmJs2dN0/c8437YL326quif7s+VP3d2ac6djZSw3tSEZ9y1yCxUpFX1UNEcMWNeP59xrqNlJefQ+PTWlD/CWPU9m07cxNfJADBqgh+3rSJRpQxulKJVEFQM2rS/XmqkZxM3Z94grb8/DM93UXdc1JFVYGBDz2J5JQU+mzZx+Tv5Uqh61cKobCvUl26PUqvMnNtycPLm4KDg0X6xkLEVxRVNVxB/jWEKa4SmbVbdoneWqWBfS+ew8jrHKrgq4/R527QpiXTNaK6dT/vomETZuGLBCBYFUHT1q0o4XyMqEI3NN375U4i3WzgR60lkcqLjKTBgx6KxLcbN1Kk9Htwly56j7Np47e06aPJhesNdtI6jiOZPb9tolXLPqS3JkwRwsU3b+9alJSUSOu3bSOngvtC3PoNGCn2lQZOOZt3eEaY7OyFsfhtP3OKti6ZoSFW/Jru5FUVUR8AEKwKIPjpp2nO6jX0oYJ2yAk52RQmRVNHq9lT0LPd6Nm2bcnZ+WFUc+q0usl9URKst0aP1nm8Pw4epCE9O+hcHFUFR098BZAzwAWrlogoSyUUKvEyFuxlDR08UBjtX945SX07d5D1y6YuWScuBgDA4CphBeDm5k4D58wUKyzLkZ6XK/bNTpH+8zbwosutm9K4ObNEqldcrJ5o+6hOqeTvcrB3dTniBD3X0fDohNO16ZPGl+t5Wf7pSiFWnq82EsZ6SRas/pEWLfuiVD4ZgGCBMjBk8GCK7tZeLDuvEin2pT6+E0ef1KpK+UMHUNPXXqYXevUiR0dHjccXFyhOBRl9gvXb77/T/735Sqlfc5/g1uW6hNfi6HVCrJj49EedIHjaEHeAGDv1faSCoOJSQnsnJ/7T2DU3OzsUp5oowN+fMl71pEWFVcX+/h2pTzHRYQP9lZdfpl927lR7HJvmXp6Pps/ESI/XJ1ZMTloi+dYqfaFqYAN/+jMmhho3bmL0c1GyXcwfNRNp1NovqXqeC3Vr10OkgYiszExMnJz6Sndh0v/3clsO3L4cXzw3KeIyaO7BC8EqFJrne/TQKja5ubl0JSqKatasqbadhWzIoEdX5FIkAZM7hqqcgWF/a8C/Opbp9R6PiKQne75u9PMg1y6m5ouPUYZDNQp9bg2KQ80X9hDWSv/350qitcwsBEt6sV35RXNAoQospG1z1LyLFSsC9uxVPg2A56appnuY8/gYPfO1Hjx4QFGSYDULfHRu2DTn31VelkqYVFcLOT1UmfFczqCKxBL+iaF2I3tqfS6uNm8fFKhz4vPeI2fovks9g98vL7AhmD9f04OoZk/bm56RfVyD/dVo2emlVvWdMNfxFy9Gavy/Lvw/z2HxUmkfi9dwSbjCzCYlBOrRVXEhKglHRnV9fUWE1bt37yKx0nYlkNNEjrz869Wj/v36qQkaH6uRT03Z5+EyAa554quBusSKfSRnLz+jn4c1dr+RU46LxvYX7ncgFzd8T4BubCoiJZRUtlvxfUePHjvQoUP7rgaouUETM01x/N79+8je3l7NiyoOR0o+derQps2bydvbWwgSC1zJolAWoyVLl5Kn9NeQ08TiQlU8Knu+RS0KrK8uONzOZd7K70THBW1N/FS8t/gr+nrzduEjGfp+5xVGVv83c6badu7JLtfmmNvFcAcGc/+MrWn8sWPHwzp27NCtxP/5A9IdXyUxn5SwyI+RXrD0BtZJP3YlIH0hLtKzzzyjMwJr27o1ubq6iohJG5wOsljpqr/650YMBfZ5QiOy4gJNJWLF0ZVLnQZGNb319WQ3pN0QMFmWk7ma7oWixS8chjs96hGljdu3b4v7koa7XCrYs0cPnWOq2hVobOPpLSW7iGqDO5J+vGqD0d47erJbBxVRDYA6rAog4lwE+fjonktYQ4pmEm7eFKUP+oRPXwcGZ/t8jVSQ0dV5oXh01aLjs2L6jDFAT3YAwTIzOI0LDNTtD3BJw59nzugVI1XZgq79JafhcCo4rF8PRa91w/YDNH688SrcsfApMJuUEDyEr/S9+MILOtO8OnXqiLazcia6oeIYm5BUtDIzt4Dhq4FKUkGOrvwC2xrNu8LCpwCCZYZwfZUuUqQ0r3GjRnp9LuaeFEFxOUNJcnJyRNrJEdbMRSsoqGVLsZ1XpmnjXaA4ujKWd3Xg7im6GZursR0LnwIIlomng/qiJtUVwjupui+ucCTWKihIlAu4uz0qWtJ1SfrEoQPUe8zLel8n+1zGiq4cA1zopqumWMFkBxAsE4ervpvp8a9SClPCKlWq6I3EuGNocbHSBbcv9q6ubJWeT7/7xShtXNiv+tnjiBTyae6DyQ7KCkz3cubUqVN6jXSPmjVFhbu+qREciQUY0KP97NmzYvqNPriRXsduzxsluoLJDhBhmTFJCn2pjIwMrVXwKtifMmRRCV4wtU9r/aUM67ftN0p0BZMdWKRgWdNCqmyGl2wPUxJPD2UtYLhPltx50/Z6Lp47Q4O79NcbXbVs14Xi4xPErbTvl6vYQ7PlK9l52o2+zxsLl5rXeCykqgdzHf/N11/TiJEjqWHDhjp7WHENVvv27XUey83NTevzym1/zK+O4uhKXzqo6/1yVLXx6i6N7SqTXalvhYVLzWc8FlK1UNggnzf3fSHSa9auFdFWcXjScyNJzBh9VxO9DWj/waTcjNMbXZXVu0IlO4BgWSAhY8fS95s20enTp2nV6tVqwuXi4qL38foq3OXghU71RVdlrWrXZrK/YvsMTHZgGSmhNUdbLR5/nPq1C6ATfx2l36LiKDPPVtRgqaItuSk87C9wtfzQIUMUP1eqnpourrsqa3SlzWS3PZtJtraSwL6AzxxAsMyatLQ0CmxZX0xEHir9Hpd4iyKvx9KllGRKjUmmg9F/UZYkYrn3M6hG4XSatPR7FNS5h1guTCn6Shq27jtepqp2Xe1iWtt644MGECxLhBeJ4Juupbh4XqAh0ZVKsNrUkr8yWdY5g/raxSw7uBQfLCgX4GGZAffJyWBxuXrpgtYWyF98/0upvSuY7ACCBXRStUZtw0UuNVFrdJXv7Fnq6AqV7ACCBbTCpQfBwcEGPSYsLIya+MuL3MN+V6XrloBKdgDBAnoEK5K6du1q0GO2bdtG3Z9qKxtdFfeuUtPSqF/PnjQ2sBlNHDjo0fJcMujryQ4ABMsCSYy9blhqVwr/KiH6kmzDPjbvVd4Vi1X/53vSxLgEmufqRrOuXqNjw96gDd9+q/G4W07p6MkOTALMJazg8fYG/om4nZln0Dy8mJgYauSrOTeRV82xda0t5gvy+Ckh42jOvUxqXrVq0ZjRXl60evZcWiVtf7qwhIL9qjFR84gcNZ/348b/pdioGxrbVY0IrfUztobxmEuoB0sZb0gLZC7u7NWrl6LnUo3ZvXuXbDrIq+YsXryEbGxs6Mf16+m9pBQ1sSouWu8fPEhvvfWm+L1feAjlOWp2LGWTvYtfO9nXomqTg7l4lju+suYSog7LhDl2NpJGTB5o0GO0dRjdun0/OYd1IzdbO5rg5kZ+MmKlIi/qiriHyQ6QEgLFJKbdN2i5LU4HtXUY7d76cZqcka/oOHkJCTDZgUkC092EqeJey6DxXM4glw4y1f2UHyv7cX+Y7ACCBZTD/lWbJ5406DGnjh2WXSyVDfdLJ88rPs5+O/miU1SyAwiWlZH0T7SicexfGVJ/tX3HDgrfuVNtG9ddcSnDh2Pn04cO1RUd57e0NMptU1NjOyrZgSkAD6sC4QnJShY0ZQz1r76ZMJFWunkKcXLxrEHpKXco4N4DGl6jBtWrU1fRMdLy8miy3W1ye1JdmFrnN4LJDiBY1sbMqZNpvoI1AhlD/Kur167SKw6O1MLZmRaRJIjZ0kYXKUpyUf7azmdl0WhKJpeZ6l0jOKqa4TUaHx5ASmhNrFu3jgb2aKcowmL/qn7DRoqPHRERQT0VrlUox0eJN2l4k2wqmNaCbKs9+hsGkx1AsKyUnzZ/R+2Dmioay/5V3759y/X1cETFQjXKvQp9/5YPOQ5uoCZWDEx2AMGyQrhdccPayvOza4npBvlXhgrVi2l3KHryf+nN8DDKn96CqjaroTEOJjswRTCXsALG7927R9EKzAxf2bOt4mrQ+UlWsFgrcyQjg7a0aE7vvf66WHZMVLLbyleyN073KXoNhr5fzCW0/PGYS6gHcx5fUFAgWx8lx57Dp+n11wcadPyePXvS6h2/inmA2lgtiUhS/5dozUcfCSG54hJPZ2yjNMZpq2Q35PVgLqHlj8e6hBaO0nKG0qSD/vX8hRixKHFpQnFiHzyg8XduU+DypfSJJFYM2sUApIRAK9evXiHqot8P4nSwXedupXoOFqOIwYPp2+3b6XbkJXLJyqQMb28KaN6cVkjb3QuvInK7mElXPpE9Bkx2AMECVMfDVXE6OGLyfMrMzCrV8wS1bCluukBPdmDOICU0Icrz6iCDdjEAggX0kpmr/zSXJR1UAtrFAAgWUISHl/6VkDkdLK9iUX0LnwIAwQIGcfpybLmkg1j4FECwgMFwTypd6WCTFm3K5XlhsgMIFjAIb29vMaFZG7z24NChQ43+vNpMdrSLARAsUGqi4m5Tq1atjHpMXSb7jMZoFwPME8wlrIDx7u416PiuPbLdGjhVzKQqauejrK/nQtY1mh23SmMc+1VT3IeU+/vFXELLH4+5hHow9/HHd/0gu52vDk6aNEnjeKV9PXGZSfRx+BzZMWyyc4R10SGyXN8v5hJa/njMJUQ6WGbYXB93cj5MdmCxQLAqAO7l7lvLUzYdrOblZ7TnWXj+K1SyAwgWKBvHjhySXS+Qrw4GBwcb5Tk2XN+GSnYAwQJlg7uNxl/9S7a9zMkL141S3Z5U/S4tkqKrkqCSHUCwgEEsX76cQoa8JLvP2bPs6SCb7FMuLJHdh0p2AMECiomJiaG/ju6jurU9ZdLBS/TMc93LdHyY7MDaQD+scmLe/Pm0Z8tPtGLu27L7uZxhyfDJGts3fPstnTp1SpQG+Pv7U+/evYua75UEJjtAhAWMIlYNNm6iqnZ5Wlsj81JeQwcPpPA//qDUtDRRuPdsx07ksWgxzT12gsbu+JUe++gTCnmynRAxDWGDyQ4gWKCssPgkfrdJLGxaP+4Wrd2yS3bcpiXTqerlS5Tx9ju0OKgVfRnclb7JyaVO1asXjWletSotr1GTjk+fLoRNxclbf8FkB0gJQdn5QxKWnrZ24ucF9fzp8IEztHjnIcqt70vV/R4uP8/1V46nL9EiD29ys7NTEyk55vvUpfe/XE3BTz8tTPaxJ+bLjoPJDiBY5YAlzyXcu3cvzS0mQE+5uIobZeQTRSY8Guhdx6DntEtJoeMRp2h23BeUnqtpsk+sO4jy47LpYlxkpZ8fzCW0/PGYS6gHcxlvl3KrXM6ZczVn2pZ/iG7kJmrs43Yxo9q8ajLnB3MJLX98Zc0lREpoZHh5LWPDaw1+5xBNTrEPNPaJdjFeaBcDrAOY7mbA6pRksv2Xh6Y4wmQHECxQFjyfeYY+Srxp1Ohq8+P25OBVRWMfTHYAwQJlImTsWOqxYT296+Uhu3S8oUy4FU+OgxpobEclO7BG4GGVA1x+wLeIc+fE0vE3wsLJ8fIlal7Fmeo5OpJf4U1bRHUhK0vcr7FJp+iJDcipmvrHhEp2AMECRke1dPzFfv3FFRgWMO7eECbdp0n32uApOWdsr1K8y2lyKrEPlewAggUqTMBUEZgufjz9C+2KO62xHSY7sHbgYZkYoid70rey+2CyAwgWMBnQLgYACJbZgHYxAOgGcwlNZPyWxD0Umi7fLmaQUw+d58vU3i/mElr+eMwl1IMlj+d2Md9f3a2xXWWyK/GtTOn9Yi6h5Y/HuoRWCtrFAADBMgtgsgMAwTIbtJnsT1UJgskOgAwoHK0kdPVkn+g1CCcIAERYpgF6sgMAwTILtJnshlwRBACCBcodXSb7tOajYbIDAMEyHbSZ7EPq94HJDgAEy3TQZrK382xBU5uPwgkCQAG4SlgBXMi6Rouuaprsvs616NMnZ+IEAWDKgmVNcwlTbTJk28Wwuf529X4UG3XDot4vg7mElj8ecwn1YI7j2VyfeWSaVpNdl29lzucHcwktfzzmElogMNkBgGCZBTDZAYBgmQXaKtlhsgMAwTIpdFWyf/rkDFSyAwDBMg1QyQ4ABMts0Gay93TpBJMdACOAwlEjoctkH+H+Ek4QAIiwTAOY7ABAsMwCmOwAQLDMApjsAFQsmEtYhvGr7/ys1WRvnO5T9B6tbZ4Z5hJa/njMJdSDqY0/VeUK7b51VGM7m+yfdJpu8q8fcwkxvizjK2suIa4SlgK0iwGgcoCHZWg6m5mktV0MTHYAIFgmA0x2ACBYZgPaxQAAwTIL0C4GAAiWWYBKdgAgWGYBKtkBgGCZBTDZAYBgmQ1oFwOAaYHCUS2gXQwAECyBqc8lFJXscZomu3tBdXq7Wn/MM9MD5hJa/njMJdRDRY0XlezhczT2s7m+ptMC4VtddIjEPDMdYC6h5Y/HuoQmAEx2AEwbCFYxUMkOAATLZKInNtK1gUp2ACBYJsOlu9dFtfr0M8s0Uj5UsgMAwTIpIgtTPY6ihh6ZJsx1hu8/z9iiMR6V7ABAsCqN+EKBEtGWJF79wsfRvpvHYLIDYEZYTeEop4TFEVcEZeYIMjDZAUCEZRIpoT5gsgMAwapU2KeSS/tKApMdAAhWpROflaho3N2cDI3UEQBgOlSKhxUVFXXWoAgpLs6gqQAlx2/K2BUg3QXoexxHYUMPT6ORtV6iTgXNw8rr9Vj6+IsXI8W5PnbseAzOkWWON/T/sLGwsQZVDtz277XS3TADH7ZOuk2M7PNrKv6uGfhX0MlpDt/nZmfPwdkASAkNJ6AUj2GBOyCJnTu+JgBAsCqSrqV4DEdYwxFhAWBC0bsVpIOGRFcx0m05ixWECgAIlqmmgxxNrZdEKgxfiTJ8mZyc+kp341XnXPo9mP8A5GZnh+LsAAhW2dJBjqbWF0ZTMfgqGAUWfL7AofL93Au3AQDBUoh/id9DC6Mp/NU3MlIklSpFVXOlH5cWbprL23BmgLGw+LKGwG3/PiDdtSpM+5YjmqqQ1DC6UMAew9kAiLAMg6OpbvioK5ThOAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQMXy/wIMANA5ZPKxFMfxAAAAAElFTkSuQmCC';
export default image;