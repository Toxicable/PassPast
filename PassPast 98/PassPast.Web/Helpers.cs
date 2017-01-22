using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PassPast.Web
{
    static public class Helpers
    {
        public static string ToRoman(int number)
        {
            if ((number < 0) || (number > 39)) throw new ArgumentOutOfRangeException("insert value betwheen 1 and 39");
            if (number < 1) return string.Empty;
            if (number >= 10) return "x" + ToRoman(number - 10);
            if (number >= 9) return "ix" + ToRoman(number - 9);
            if (number >= 5) return "v" + ToRoman(number - 5);
            if (number >= 4) return "iv" + ToRoman(number - 4);
            if (number >= 1) return "i" + ToRoman(number - 1);
            throw new ArgumentOutOfRangeException("something bad happened");
        }
        public static string ToAlpha(int number)
        {
            if ((number < 1) || (number > 26)) throw new ArgumentOutOfRangeException("insert value betwheen 1 and 27");
            return ((char)(number + 96)).ToString();
        }
    }
}
