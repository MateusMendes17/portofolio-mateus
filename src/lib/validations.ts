import { z } from "zod";

export const contactFormSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: "O nome deve ter pelo menos 2 caracteres." })
      .max(100, { message: "O nome não pode exceder 100 caracteres." }),
    email: z
      .string()
      .email({ message: "Por favor, introduza um endereço de email válido." }),
    phone: z
      .string()
      .max(40, { message: "O número de telefone não pode exceder 40 caracteres." })
      .optional(),
    projectType: z
      .string()
      .min(1, { message: "Por favor, selecione o tipo de projeto pretendido." })
      .max(100, { message: "O tipo de projeto não pode exceder 100 caracteres." }),
    otherProjectType: z
      .string()
      .max(100, { message: "A descrição do projeto não pode exceder 100 caracteres." })
      .optional(),
    contactPreference: z
      .string()
      .min(1, { message: "Por favor, selecione a sua preferência de contacto." })
      .max(100, { message: "A preferência de contacto não pode exceder 100 caracteres." }),
    otherContactPreference: z
      .string()
      .max(100, { message: "A preferência indicada não pode exceder 100 caracteres." })
      .optional(),
    features: z.array(z.string().max(100)).max(12).optional(),
    message: z
      .string()
      .min(10, { message: "Por favor, descreva o seu projeto com pelo menos 10 caracteres." })
      .max(2000, { message: "A mensagem não pode exceder 2000 caracteres." }),
    consent: z
      .boolean()
      .refine((val) => val === true, {
        message: "Tem de autorizar o tratamento dos dados para podermos responder.",
      }),
    honeypot: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.projectType === "outro") {
        return Boolean(data.otherProjectType && data.otherProjectType.trim().length >= 3);
      }
      return true;
    },
    {
      message: "Por favor, especifique o tipo de projeto pretendido.",
      path: ["otherProjectType"],
    }
  )
  .refine(
    (data) => {
      if (data.contactPreference === "outro") {
        return Boolean(data.otherContactPreference && data.otherContactPreference.trim().length >= 3);
      }
      return true;
    },
    {
      message: "Por favor, especifique a sua preferência de contacto.",
      path: ["otherContactPreference"],
    }
  )
  .refine(
    (data) => {
      // O telefone é obrigatório quando o utilizador pediu para ser contactado
      // por chamada telefónica ou WhatsApp — caso contrário fica sem contacto.
      const requiresPhone =
        data.contactPreference === "chamada" || data.contactPreference === "whatsapp";
      if (!requiresPhone) return true;
      const digits = (data.phone ?? "").replace(/\D/g, "");
      return digits.length >= 6;
    },
    {
      message:
        "Indique um número de telefone válido — é obrigatório para a preferência de contacto selecionada.",
      path: ["phone"],
    }
  );

export type ContactFormData = z.infer<typeof contactFormSchema>;
